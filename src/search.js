import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles(theme => ({
  container: {
    display: "block",
    flexWrap: "wrap"
  },
  textField: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    // width: 200,
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
}));

export default function TextFields(props) {
  const classes = useStyles();
  return (
    <form className={classes.container} noValidate autoComplete="off">
      {/* <FormLabel component="legend">
        {props.keyLabel.length > 2 
          ? props.keyLabel.charAt(0).toUpperCase() +
            props.keyLabel.slice(1) +
            's'
          : props.keyLabel.charAt(0).toUpperCase() +
            props.keyLabel.charAt(1).toUpperCase()}
      </FormLabel> */}
      <TextField
        id="standard-search"
        label={
          "Search " + props.keyLabel.length > 2
            ? props.keyLabel.charAt(0).toUpperCase() +
              props.keyLabel.slice(1) +
              "s"
            : "Search " +
              props.keyLabel.charAt(0).toUpperCase() +
              props.keyLabel.charAt(1).toUpperCase() +
              "s"
        }
        type="search"
        className={classes.textField}
        margin="normal"
        onChange={props.onChange}
        name={props.name}
      />
    </form>
  );
}
