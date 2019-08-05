import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export default function RadioButtons(props) {
  // const [value, setValue] = React.useState("color");

  const useStateFilter = props.categories.filter(
    category => category !== "id" || category !== "name"
  );
  const [value, setValue] = React.useState(useStateFilter[0]);

  function handleChange(event) {
    setValue(event.target.value);
    return props.onChange(event.target.value);
  }

  return (
    <FormControl component="fieldset">
      {/* <FormLabel component="legend">labelPlacement</FormLabel> */}
      <RadioGroup
        aria-label="position"
        name="position"
        value={value}
        onChange={handleChange}
        row
      >
        {props.categories.map(category => {
          if (category !== "id") {
            return (
              <FormControlLabel
                value={category}
                control={<Radio color="primary" />}
                key={category}
                label={
                  category.length > 2
                    ? category.charAt(0).toUpperCase() + category.slice(1)
                    : category.charAt(0).toUpperCase() +
                      category.charAt(1).toUpperCase()
                }
                labelPlacement="end"
              />
            );
          }
          return false;
        })}
      </RadioGroup>
    </FormControl>
  );
}
