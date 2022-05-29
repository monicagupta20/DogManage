export const ADD_DATA = 'ADD_DATA';
export const CREATE_DATA = 'CREATE_DATA';
export const UPDATE_DATA = 'UPDATE_DATA';
export const DELETE_DATA = 'DELETE_DATA';

export const addData = (quotes) => ({
    type: ADD_DATA,
    data: {quotes}
});

export const createData = (quote) => ({
    type: CREATE_DATA,
    data: {quote}
});

export const updateData = (quote) => ({
    type: UPDATE_DATA,
    data: {quote}
});

export const deleteData = (id) => ({
    type: DELETE_DATA,
    data: {id}
});