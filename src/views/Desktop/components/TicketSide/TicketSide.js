import React, {useEffect, useMemo, useReducer, useRef} from 'react';
import {initialState, reducer, setFocus} from "./store";
import Context from "./Context";
import {withTicketStore} from "./withTicketStore";
import TicketToolbar from "./components/TicketToolbar/TicketToolbar";

const withFocus = (Component) => (props) => {
    const {index, state} = props
    const ref = useRef()

    useEffect(() => {
        if (state.focus === index)
            ref.current && ref.current.scrollIntoView({behavior: 'smooth', block: 'start'})

    }, [state.focus])

    return (
        <div ref={ref}>
            {useMemo(() => <Component {...props}></Component>)}
        </div>
    )
}

const NumberDiv = ({index}) => {
    console.log(index)
    return (<div className={"mt-5 mb-5"} key={index}>{index}</div>)
}
const FocusNumberDiv = withFocus(NumberDiv)

function TicketSide(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const TestArray = (props) => Array.from(new Array(50)).map((item, index) => <FocusNumberDiv
        index={index} {...props}/>)

    const TicketDetailBound = withTicketStore(TestArray)
    const BindToolbar = withTicketStore(TicketToolbar)
    const myRef = useRef()
    const goto = () => {
        dispatch(setFocus(state.focus + 1))
        //myRef.current.scrollIntoView({behavior: 'smooth', block: 'start'})
    }
    return (
        <Context.Provider
            value={{
                state,
                dispatch,
            }}
        >
            <button onClick={goto}>Goto</button>
            <TicketDetailBound></TicketDetailBound>


        </Context.Provider>
    );
}

export default TicketSide;
