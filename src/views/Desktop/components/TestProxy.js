import React, {createContext, useReducer} from "react";

const CounterContext = createContext();

const INCREMENT = "increment";
const DECREMENT = "decrement";

// action creators
const incrementAction = () => ({
    type: INCREMENT,
});
const decrementAction = () => ({
    type: DECREMENT,
});

// reducer
const counterInitState = {count: 0};
const reducer = (state = counterInitState, action) => {
    switch (action.type) {
        case INCREMENT:
            return {count: state.count + 1};
        case DECREMENT:
            return {count: state.count - 1};
        default:
            return state;
    }
};

export const withCounter = Component => props => (
    <CounterContext.Consumer>
        {({state, dispatch}) => (
            <Component {...props} state={state} dispatch={dispatch}>
                {props.children}
            </Component>
        )}
    </CounterContext.Consumer>
);

const Display = ({state}) => {
    return <div>Count: {state.count}</div>;
};
const CounterDisplay = withCounter(Display);

const IncrementButton = ({dispatch}) => {
    return <button onClick={() => dispatch(incrementAction())}>+1</button>;
};
const CounterIncrementButton = withCounter(IncrementButton);

const DecrementButton = ({state, dispatch}) => {
        const counter = state.count
        return (<>
            <button onClick={() => dispatch(decrementAction())}>-1</button>
            {counter}</>)
    }
;
const CounterDecrementButton = withCounter(DecrementButton);

const Counter = () => {
        const [state, dispatch] = useReducer(reducer, counterInitState);
        return (
            <CounterContext.Provider
                value={{
                    state,
                    dispatch,
                }}
            >
                <CounterDisplay/>
                <CounterIncrementButton/>
                <CounterDecrementButton/>
            </CounterContext.Provider>
        );
    }
;

export default Counter;
