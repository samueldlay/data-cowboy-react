/** @jsx jsx */ // emotion <----THIS IS A PRAGMA

import React from "react";
import "./App.css";
import { loadData, UIdata } from "./uiapi";
import { css, jsx } from "@emotion/core"; // emotion
import RangeSlider from "./valueslider";
import Chart from "react-google-charts";
import TextFields from "./search";
import FormControlLabelPosition from "./checkboxes";
import RadioButtons from "./radio";

function Checkboxes(props) {
  return [...props.checkBoxes].map(([key, value]) => {
    return (
      <ul key={key}>
        <FormControlLabelPosition
          category={key}
          details={value}
          onChange={props.onChange}
        />
      </ul>
    );
  });
}
function Objects(props) {
  return [...props.objects].map(([key, value]) => {
    return (
      <ul key={key}>
        <h2>
          {key.length > 2
            ? key.charAt(0).toUpperCase() + key.slice(1)
            : key.charAt(0).toUpperCase() + key.charAt(1).toUpperCase()}
        </h2>
        <RangeSlider changed={props.onChange} name="objDetails" />
      </ul>
    );
  });
}

function IDs(props) {
  return [...props.ID].map(([key, value]) => {
    return (
      <ul key={key}>
        <TextFields onChange={props.onChange} name={key} keyLabel={key} />
      </ul>
    );
  });
}

function Values(props) {
  return [...props.values].map(([key, value]) => {
    return (
      <ul key={key}>
        <RangeSlider
          changed={props.onChange}
          values={props.values}
          name="value"
        />
      </ul>
    );
  });
}

function DetailLists(props) {
  const checkBoxes = [...props.detailMap.entries()].filter(([key, value]) => {
    return value.length < 10;
  });

  const objects = [...props.detailMap.entries()].filter(([key, value]) => {
    return typeof value[0] === "object";
  });

  const ID = [...props.detailMap.entries()].filter(([key, value]) => {
    return key === "id" || key === "ID" || key === "name" || key === "Name";
  });

  const values = [...props.detailMap.entries()].filter(([key, value]) => {
    return key === "value" || value === "price";
  });

  return (
    <div>
      <IDs detailMap={props.detailMap} onChange={props.onChange} ID={ID} />
      <Values
        detailMap={props.detailMap}
        onChange={props.onChange}
        values={values}
      />
      <Checkboxes
        detailMap={props.detailMap}
        onChange={props.onChange}
        checkBoxes={checkBoxes}
      />
      <Objects
        detailMap={props.detailMap}
        onChange={props.onChange}
        objects={objects}
      />
    </div>
  );
}

function ChartRadios(props) {
  if (Object.keys(props.options).length > 0) {
    const keys = Object.keys(props.options);
    return (
      <RadioButtons
        onChange={props.filterCheckbox}
        categories={keys}
        name="category"
      />
    );
  }
  return false;
}

function PieChart(props) {
  // console.log('e', e.target)

  const keys = [...props.mappedUI.keys()];

  const dataArray = [
    [props.category ? props.category : `${keys[0]}`, "percentage"]
  ];

  // let devices;

  // if (props.devices.length === 0) {
  //   devices = props.allDevices;
  // } else devices = props.devices

  const mappedDetails = props.devices.map(
    device => device[props.category ? props.category : keys[0]]
  );
  const set = new Set();
  for (const detail of mappedDetails) {
    set.add(detail);
  }
  for (const detail of [...set]) {
    dataArray.push([
      `${
        typeof detail === "string"
          ? detail.charAt(0).toUpperCase() + detail.slice(1)
          : `$${detail.toFixed(2)}`
      }`,
      mappedDetails.filter(det => det === detail).length
    ]);
  }

  const pieOptions = {
    title: "",
    // pieSliceText: "label",
    pieHole: 1,
    slices: [
      {
        color: "#2BB673"
      },
      {
        color: "#d91e48"
      },
      {
        color: "#007fad"
      },
      {
        color: "#e9a227"
      }
    ],
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "233238",
        fontSize: 14
      }
    },
    // legend: 'none',
    tooltip: {
      showColorCode: true
    },
    chartArea: {
      left: 0,
      top: 0,
      width: "100%",
      height: "80%"
    },
    fontName: "Roboto"
  };
  return (
    <div className="App">
      <Chart
        chartType="PieChart"
        data={dataArray}
        options={pieOptions}
        graph_id="PieChart"
        width={"100%"}
        height={"400px"}
        legend_toggle
      />
    </div>
  );
}

function DataOutput(props) {
  const checkedCats = [];
  for (const [key, set] of Object.entries(props.options)) {
    if (set.size > 0) {
      checkedCats.push(key);
    }
  }
  if (Object.keys(props.options).length && props.devices.length > 0) {
    const categories = Object.keys(props.options);
    return (
      <table id="items">
        <colgroup span={Object.keys(props.options).length} />
        <tbody>
          <tr>
            {categories.map(cat => {
              return (
                <th key={cat} className="categories" colSpan="1">
                  {cat.length > 2
                    ? cat.charAt(0).toUpperCase() + cat.slice(1)
                    : cat.charAt(0).toUpperCase() + cat.charAt(1).toUpperCase()}
                </th>
              );
            })}
          </tr>
        </tbody>

        {props.devices.map(device => {
          return (
            <tbody>
              <tr>
                {categories.map(category => {
                  return (
                    <td key={category}>
                      {/* {typeof device[category] !== "object"
                      ? device[category]
                      : ""} */}
                      {category === "value" || category === "price"
                        ? "$" + device[category].toFixed(2)
                        : device[category]}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          );
        })}
      </table>
    );
  } else console.log("Nothing to output. This is the first render");

  return props.devices;
}

class UserInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: [],
      mappedUI: new Map(),
      options: {},
      chartImageURI: "",
      categories: null
    };
    this.filterChartCheckboxes = this.filterChartCheckboxes.bind(this);
    this.filteredDataset = this.filteredDataset.bind(this);
    this.InterfaceData = this.InterfaceData.bind(this);
    this.setFilterOptions = this.setFilterOptions.bind(this);
    this.reduceFiltVals = this.reduceFiltVals.bind(this);
  }

  componentDidMount() {
    this.InterfaceData();
  }

  filteredDataset() {
    let filtered = [...this.state.dataset];
    const details = [];
    const categories = [];

    for (const value of Object.values(this.state.options)) {
      if (value.size > 0) {
        details.push([...value.values()]);
        for (const key of Object.keys(this.state.options)) {
          if (this.state.options[key].has(...[...value.values()])) {
            categories.push(key);
          }
        }
      }
    }

    for (let i = 0; i < categories.length; i++) {
      filtered = filtered.filter(device => {
        return details[i].includes(device[categories[i]]);
      });
    }

    // return categories.length > 0 ? filtered : [];
    return filtered;
  }

  async InterfaceData() {
    const dataset = await loadData();
    const mappedUI = UIdata(dataset);
    const options = {};
    [...mappedUI.keys()].forEach(category => (options[category] = new Set()));
    this.setState({
      dataset,
      mappedUI,
      options
    });
  }

  filterChartCheckboxes(e) {
    this.setState({
      categories: e
    });
  }

  setFilterOptions(detail, name) {
    if (detail.target) {
      const checked = detail.target.checked;
      const checkbox = detail.target.type === "checkbox";
      const search = detail.target.type === "search";
      // const range = detail.target.type === "range";

      if (checkbox) {
        const json = JSON.parse(detail.target.value);
        const category = json.category;
        const value = json.value;
        const optionCategory = new Set([...this.state.options[category]]);
        if (checked) optionCategory.add(value);
        else optionCategory.delete(value);
        this.setState({
          options: {
            ...this.state.options,
            [category]: optionCategory
          }
        });
      }

      if (search) {
        const value = detail.target.value;
        const category = detail.target.name;
        const optionCategory = new Set();
        // NOTE TO SELF: Logic could be expanded to eventually search for any item
        if (value.length > 0) {
          const targetNameArray = this.state.mappedUI.get(category);
          const filtered = targetNameArray.filter(targetName => {
            return targetName.toString().includes(value);
          });

          for (const targetName of filtered) {
            optionCategory.add(targetName);
          }

          this.setState({
            options: {
              ...this.state.options,
              [category]: optionCategory
            }
          });
        } else
          this.setState({
            options: {
              ...this.state.options,
              [category]: optionCategory
            }
          });
      }
    } else {
      const value = detail;
      const category = name;
      const optionCategory = new Set();
      const targetNameArray = this.state.mappedUI.get(category);

      if (typeof targetNameArray[0] !== "object") {
        const filtered = targetNameArray.filter(
          val => val >= value[0] && val <= value[1]
        );
        for (const val of filtered) {
          optionCategory.add(val);
        }
        this.setState({
          options: {
            ...this.state.options,
            [category]: optionCategory
          }
        });
      } else {
        // const mapped = UIdata(targetNameArray);
        // const measurements = [...mapped.keys()];
        // // console.log(measurements);
        // // console.log(mapped.get("height"));
        // const units = (acc, curr) => {
        //   let set = new Set(acc);
        //   let map = new Map();
        //   for (const obj of mapped.get("height")) {
        //     if (obj.unit === "in") set.add(obj.value);
        //   }
        //   map.set("in", [...set]);
        //   // console.log(map);
        //   return [...set];
        // };
        // // console.log(units());
        // const filtered = units().filter(val => val > value);
        // console.log(filtered);
        // for (const val of filtered) {
        //   optionCategory.add(val);
        // }
        // this.setState({
        //   options: {
        //     ...this.state.options,
        //     [category]: optionCategory
        //   }
        // });
        // // console.log([...mapped.values()]);
      }
    }
  }
  reduceFiltVals(array) {
    const values = [];
    for (const device of array) {
      values.push(device.value);
    }
    return values.reduce((acc, curr) => acc + curr, 0);
  }
  render() {
    return (
      <div id="parent">
        <div id="sideMenu">
          {/* <h3>
            There are {this.state.dataset.length} devices in inventory. Narrow
            your search below.
          </h3> */}
          <DetailLists
            detailMap={this.state.mappedUI}
            onChange={this.setFilterOptions}
          />
        </div>
        <div id="content">
          <ul>
            <ChartRadios
              options={this.state.options}
              filterCheckbox={this.filterChartCheckboxes}
              devices={this.filteredDataset()}
            />
            <PieChart
              devices={this.filteredDataset()}
              mappedUI={this.state.mappedUI}
              options={this.state.options}
              category={this.state.categories}
              allDevices={this.state.dataset}
            />
            <h4>
              You are currently displaying{" "}
              {this.filteredDataset().length === this.state.dataset.length
                ? "all " + this.filteredDataset().length
                : this.filteredDataset().length}{" "}
              item
              {this.filteredDataset().length === 1 ? "" : "s"} from inventory,
              totalling{" "}
              <span style={{ fontWeight: "bold" }}>
                ${this.reduceFiltVals(this.filteredDataset()).toFixed(2)}
              </span>
            </h4>

            <DataOutput
              devices={this.filteredDataset()}
              mappedUI={this.state.mappedUI}
              options={this.state.options}
            />
          </ul>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <UserInterface />
    </div>
  );
}

export default App;
