import { combineReducers } from 'redux';

import { ADD_DATA, CREATE_DATA, UPDATE_DATA, DELETE_DATA } from "./actions";

let dataState = { quotes: [] };

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case CREATE_DATA:
            let { quote } = action.data;

            let clone = JSON.parse(JSON.stringify(state.quotes));

            clone.unshift(quote);

            return {...state, quotes: clone};

        case ADD_DATA:
            let { quotes } = action.data;

            return {...state, quotes};

        case UPDATE_DATA:{
            let { quote } = action.data;

            let clone = JSON.parse(JSON.stringify(state.quotes));

            const index = clone.findIndex((obj) => obj.id === quote.id);

            if (index !== -1) clone[index] = quote;

            return {...state, quotes: clone};
        }

        case DELETE_DATA:{
            let { id } = action.data;

            let clone = JSON.parse(JSON.stringify(state.quotes));

            const index = clone.findIndex((obj) => obj.id === id);

            if (index !== -1) clone.splice(index, 1);

            return {...state, quotes: clone};
        }

        default:
            return state;
    }
};

const rootReducer = combineReducers({dataReducer});

export default rootReducer;
