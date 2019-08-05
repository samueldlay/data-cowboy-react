import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

function FormControlLabelPosition(props) {
  // const [value, setValue] = React.useState("female");

  // function handleChange(event) {
  //   // setValue(event.target.value);
  // }
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">
        {props.category.length > 2
          ? props.category.charAt(0).toUpperCase() + props.category.slice(1)
          : props.category.charAt(0).toUpperCase() +
            props.category.charAt(1).toUpperCase()}
      </FormLabel>
      {props.details.map(detail => {
        return (
          <FormGroup
            aria-label="position"
            name="position"
            key={detail}
            value={props.category}
            onChange={props.onChange}
            row
          >
            <FormControlLabel
              value={JSON.stringify({
                category: props.category,
                value: detail
              })}
              control={<Checkbox color="primary" />}
              label={
                // detail.length > 2
                //   ? detail.charAt(0).toUpperCase() + detail.slice(1)
                //   : detail.charAt(0).toUpperCase() +
                //     detail.charAt(1).toUpperCase()
                detail
              }
              labelPlacement="end"
            />
          </FormGroup>
        );
      })}
    </FormControl>
  );
}

export default FormControlLabelPosition;
