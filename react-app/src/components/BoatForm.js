import { Button, Grid, MenuItem, Select, Stack, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/boat";
import FormHelper from "./FormHelper";
import { useToasts } from "react-toast-notifications";

const initialFieldValues = {
  name: "",
  status: 1,
  notes: ""
};

const BoatForm = (props) => {

  // Toast message
  const { addToast } = useToasts();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('name' in fieldValues) {
      temp.name = fieldValues.name ? "" : "Boat name is required.";
    }

    setErrors({
      ...temp
    });

    if (fieldValues === values) {
      return Object.values(temp).every(x => x === "");
    }
  }

  const {
    values,
    setValues,
    handleInputChange,
    errors,
    setErrors,
    resetForm
  } = FormHelper(initialFieldValues, validate, props.setCurrentId);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(values);
    if (validate()) {
      const onSuccess = () => {
        addToast("Submitted successfully", { appearance: "success" });
        resetForm();
      }
      if (props.currentId !== 0) {
        props.updateBoat(props.currentId, values, onSuccess)
      }
      else {
        props.createBoat(values, onSuccess);
      }
    }
  }

  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.boatList.find(x => x.id === props.currentId)
      });
      setErrors({});
    }
  }, [props.currentId]);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            className="Min-Width"
            name="name"
            variant="outlined"
            label="Boat Name"
            value={values.name}
            onChange={handleInputChange}
            {...(errors.name && { error: true, helperText: errors.name })}
          />
          <Select
            className="Min-Width"
            name="status"
            label="Status"
            value={values.status}
            onChange={handleInputChange}>
            <MenuItem value={1}>Docked</MenuItem>
            <MenuItem value={2}>Outbound</MenuItem>
            <MenuItem value={3}>Inbound</MenuItem>
            <MenuItem value={4}>Repairs</MenuItem>
          </Select>
          <TextField
            className="Min-Width"
            name="notes"
            variant="outlined"
            label="Notes"
            value={values.notes}
            onChange={handleInputChange} />
        </Grid>
        <Grid item xs={6}>
          <Stack direction="row" spacing={2}>
            <Button variant="contained"
              color="primary"
              type="Submit">
              Submit
            </Button>
            <Button variant="contained" color="secondary" onClick={resetForm}>
              Reset
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    boatList: state.boat.list
  }
}

const mapActionToProps = {
  createBoat: actions.create,
  updateBoat: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(BoatForm);