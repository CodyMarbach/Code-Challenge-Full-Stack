import React, {useEffect} from "react";
import { connect } from "react-redux";
import * as actions from "../actions/boat";
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import BoatForm from "./BoatForm";

const Boats = (props) => {
    useEffect(() => {
        props.fetchAllBoats();
    }, []) //Similar lifecycle to componentDidMount
  return (
    <Paper>
        <Grid container>
            <Grid item xs={6}>
                <BoatForm></BoatForm>
            </Grid>
            <Grid item xs={6}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Boat</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Notes</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                props.boatList.map((record, index) => {
                                    return (
                                        <TableRow key={record.id}>
                                            <TableCell>{record.name}</TableCell>
                                            <TableCell>{localizeBoatStatus(record.status)}</TableCell>
                                            <TableCell>{record.notes}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    </Paper>
  );
};

const mapStateToProps = state => {
    return {
        boatList: state.boat.list
    }
}

const mapActionToProps = {
    fetchAllBoats: actions.fetchAll
}

const localizeBoatStatus = (statusInt) => {
    switch(statusInt){
        case 1: return "Docked";
        case 2: return "Outbound to Sea";
        case 3: return "Inbound to Harbour";
        case 4:
        default:
                return "Maintenance";
    }
}

export default connect(mapStateToProps, mapActionToProps)(Boats);
