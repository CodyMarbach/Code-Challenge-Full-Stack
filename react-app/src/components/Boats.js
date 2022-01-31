import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/boat";
import { Button, ButtonGroup, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import BoatForm from "./BoatForm";
import { Delete, Edit } from "@material-ui/icons";
import { useToasts } from "react-toast-notifications";


const Boats = (props) => {
    const [currentId, setCurrentId] = useState(0);

    

    useEffect(() => {
        props.fetchAllBoats();
    }, []) //Similar lifecycle to componentDidMount

    //Toast message
    const { addToast } = useToasts();

    const deleteRecord = id => {
        if (window.confirm("Do you really want to remove this boat? This cannot be undone.")) {
            props.deleteBoat(id, () => addToast("Boat removed", { appearance: "info" }));
        }
    }

    return (
        <Paper className="Paper" elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <BoatForm {...({ currentId, setCurrentId })} />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Boat</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Notes</TableCell>
                                    <TableCell></TableCell>
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
                                                <TableCell>
                                                    <ButtonGroup>
                                                        <Button><Edit onClick={() => { setCurrentId(record.id) }} /></Button>
                                                        <Button><Delete color="secondary" onClick={() => deleteRecord(record.id)} /></Button>
                                                    </ButtonGroup>
                                                </TableCell>
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
    fetchAllBoats: actions.fetchAll,
    deleteBoat: actions.delete_action
}

const localizeBoatStatus = (statusInt) => {
    switch (statusInt) {
        case 1: return "Docked";
        case 2: return "Outbound to Sea";
        case 3: return "Inbound to Harbour";
        case 4:
        default:
            return "Maintenance";
    }
}

export default connect(mapStateToProps, mapActionToProps)(Boats);
