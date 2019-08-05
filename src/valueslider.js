import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { inherits } from "util";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles({
  root: {
    width: "inherit",
    marginRight: "40px"
  }
});

function valuetext(value) {
  return `$${value}`;
}

export default function RangeSlider(props) {
  const classes = useStyles();
  const values = props.values[0][1];
  const max = Math.max(...values);
  const min = Math.min(...values);
  const [value, setValue] = React.useState([min, max]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    return props.changed(newValue, props.name);
  };
  return (
    <div className={classes.root}>
      {/* {props.name.charAt(0).toUpperCase() + props.name.slice(1)} */}
      <FormLabel component="legend">
        {props.name.length > 2
          ? props.name.charAt(0).toUpperCase() + props.name.slice(1)
          : props.name.charAt(0).toUpperCase() +
            props.name.charAt(1).toUpperCase()}
      </FormLabel>
      <Typography id="range-slider" gutterBottom />
      <Slider
        value={value}
        onChange={handleChange}
        min={Math.min(...values)}
        max={Math.max(...values)}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
