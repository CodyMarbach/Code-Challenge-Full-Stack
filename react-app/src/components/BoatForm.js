import { Button, ButtonGroup, Grid, MenuItem, Select, Stack, TextField } from "@mui/material";
import React from "react";
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
      props.createBoat(values, onSuccess);
    }
  }

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          Add new Boat
        </Grid>
        <Grid item xs={4}>
          <TextField
            className="Min-Width"
            name="name"
            variant="outlined"
            label="Boat Name"
            value={values.name}
            onChange={handleInputChange}
            {...(errors.name && { error: true, helperText: errors.name })}
          />
        </Grid>
        <Grid item xs={4}>
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
        </Grid>
        <Grid item xs={4}>
          <TextField
            className="Min-Width"
            name="notes"
            variant="outlined"
            label="Notes"
            value={values.notes}
            onChange={handleInputChange} />
        </Grid>
        <Grid item xs={8}>

        </Grid>
        <Grid item xs={4}>
          <Stack direction="row" spacing={2}>
            <ButtonGroup>
              <Button variant="contained"
                color="primary"
                type="Submit">
                Submit
              </Button>
              <Button variant="contained" color="secondary" onClick={resetForm}>
                Reset
              </Button>
            </ButtonGroup>
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