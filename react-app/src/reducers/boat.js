import {ACTION_TYPES} from "../actions/boat";
const initialState = {
    list:[]
}

export const boat = (state = initialState, action) => {
    switch(action.type)
    {
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                list: [...action.payload]
            }
        default:
            return state;
    }
}