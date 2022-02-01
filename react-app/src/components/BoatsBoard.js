import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Board, { addCard, changeCard, moveCard, removeCard } from '@asseinfo/react-kanban'
import '@asseinfo/react-kanban/dist/styles.css'
import * as actions from "../actions/boat";
import { Box, CircularProgress, Fade, Paper } from "@mui/material";

const BoatsBoard = (props) => {
    // Initial board defines columns, attributes on the board prevent adding columns at this time.
    const initialBoard = {
        columns: [
            {
                id: 1,
                key: 9001,
                title: "Docked",
                cards: []
            },
            {
                id: 2,
                key: 9002,
                title: "Outbound",
                cards: []
            },
            {
                id: 3,
                key: 9003,
                title: "Inbound",
                cards: []
            },
            {
                id: 4,
                key: 9004,
                title: "Maintenance",
                cards: []
            }
        ]
    };

    const [board, setBoard] = useState(initialBoard);
    const [loading, setLoading] = useState(true);

    const handleCardMove = (card, source, destination) => {
        const onSuccess = () => {
            moveCardUpdate(source, destination)
        }
        props.updateBoat(card.id,
            {
                ...props.boatList.find(x => x.id === card.id),
                status: destination.toColumnId
            },
            onSuccess)
    }

    // This function is required due to maintaining the entire board in the state, to handle all changes and prevent
    // unexpected results. It does seem to cause minor performance issues with the card blinking back to the original row
    // due to API / SQL performance speed.
    const moveCardUpdate = (source, destination) => {
        var newBoard = moveCard(board, source, destination);
        setBoard(newBoard);
    }

    const handleCardRemove = (card) => {
        var column = board.columns.find(x => x.cards.find(y => y.id === card.id));
        const onSuccess = () => {
            removeCardUpdate(column, card);
        }

        props.deleteBoat(card.id, onSuccess);
    }

    // This function is required due to maintaining the entire board in the state, to handle all changes and prevent
    // unexpected results. It does seem to cause minor performance issues with the card reappearing briefly
    // due to API / SQL performance speed.
    const removeCardUpdate = (column, card) => {
        var newBoard = removeCard(board, column, card);
        setBoard(newBoard);
    }

    // This use of useEffect gives similar behavior as componentDidMount
    useEffect(() => {
        setLoading(true);
        props.fetchAllBoats();
    }, [])

    useEffect(() => {
        var newBoard = board;
        props.boatList.forEach(record => {
            var column = newBoard.columns.find(x => x.id === record.status);

            if (column) {
                var card = column.cards.find(x => x.id === record.id);

                if (card) {
                    newBoard = changeCard(newBoard, record.id, { key: record.id, title: record.name, description: record.notes })
                } else {
                    newBoard = addCard(newBoard, column, { id: record.id, key: record.id, title: record.name, description: record.notes });
                }

                setBoard(newBoard);
            }
        });
        // Disable the loading spinner if we have data
        if(props.boatList.length > 0) {setLoading(false);}        
    }, [props.boatList])

    return (
        <Paper className="Paper Board-Center" elevation={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ height: 40 }}>
                    <Fade
                        in={loading}
                        style={{
                            transitionDelay: loading ? '800ms' : '0ms',
                        }}
                        unmountOnExit
                    >
                        <CircularProgress />
                    </Fade>
                </Box>
            </Box>
            <Board
                allowRemoveCard
                disableColumnDrag
                onCardDragEnd={handleCardMove}
                onCardRemove={handleCardRemove} >
                {board}
            </Board>
        </Paper>
    )
}

const mapStateToProps = state => {
    return {
        boatList: state.boat.list
    }
}

const mapActionToProps = {
    fetchAllBoats: actions.fetchAll,
    updateBoat: actions.update,
    deleteBoat: actions.delete_action
}

export default connect(mapStateToProps, mapActionToProps)(BoatsBoard);