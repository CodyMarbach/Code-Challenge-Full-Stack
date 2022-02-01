import api from "./api";

/**
 * Mapping up each basic API action to the API call logic.
 * No implementation for single GET at this point, can be added for future needs.
 */

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
};

export const fetchAll = () => {
    return dispatch => {
        api.boats().fetchAll()
            .then(
                response => {
                    dispatch({
                        type: ACTION_TYPES.FETCH_ALL,
                        payload: response.data
                    })
                }
            )
            .catch(err => console.log(err))
    }
}

export const create = (data, onSuccess) => dispatch => {
    api.boats().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
            onSuccess();
        })
        .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    api.boats().update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: {id: id, ...data}
            })
            onSuccess();
        })
        .catch(err => console.log(err))
}

export const delete_action = (id, onSuccess) => dispatch => {
    api.boats().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            if(onSuccess) onSuccess();
        })
        .catch(err => console.log(err))
}