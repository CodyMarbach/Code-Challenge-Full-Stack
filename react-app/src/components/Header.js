import React from "react";
import { connect } from "react-redux";
import { Grid, Paper } from "@mui/material";
import BoatForm from "./BoatForm";
import * as actions from "../actions/boat";

const Header = (props) => {
    return (
        <Paper className="Paper" elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    Fishfry Tours
                </Grid>
                <Grid item xs={6}>
                    <BoatForm />
                </Grid>
            </Grid>
        </Paper>
    )
}

const mapStateToProps = state => {
    return {
        boatList: state.boat.list
    }
}

const mapActionToProps = {
    fetchAllBoats: actions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(Header);