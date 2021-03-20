// action creators
export const setFocus = (focus) => ({
    type: 'SET_FOCUS', focus
});
export const decrementAction = () => ({
    type: 'DECREMENT',
});

// reducer
export const initialState = {count: 0, focus: 25};
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FOCUS':
            return {focus: action.focus};
        case 'DECREMENT':
            return {count: state.count - 1};
        default:
            return state;
    }
};
