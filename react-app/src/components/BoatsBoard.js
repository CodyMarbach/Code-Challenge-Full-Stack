import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Board, { addCard, changeCard, moveCard, removeCard } from '@asseinfo/react-kanban'
import '@asseinfo/react-kanban/dist/styles.css'
import * as actions from "../actions/boat";
import { Paper } from "@mui/material";

const BoatsBoard = (props) => {
    const initialBoard = {
        columns: [
            {
                id: 1,
                key: 1,
                title: "Docked",
                cards: []
            },
            {
                id: 2,
                key: 2,
                title: "Outbound",
                cards: []
            },
            {
                id: 3,
                key: 3,
                title: "Inbound",
                cards: []
            },
            {
                id: 4,
                key: 4,
                title: "Maintenance",
                cards: []
            }
        ]
    };

    const [board, setBoard] = useState(initialBoard);

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

    const removeCardUpdate = (column, card) => {
        var newBoard = removeCard(board, column, card);
        setBoard(newBoard);
    }

    useEffect(() => {
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
        })
    }, [props.boatList])

    return (
        <Paper className="Paper Board-Center" elevation={3}>
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