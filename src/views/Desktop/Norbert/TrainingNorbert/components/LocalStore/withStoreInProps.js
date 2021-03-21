import React from "react";

export const withStoreInProps = Context => (Component, mapStateToProps, mapDispatchToProps) => props => (
    <Context.Consumer>
        {({state, dispatch}) => {
            const addStateMaps = mapStateToProps && mapStateToProps(state)
            const addDispatchMaps = mapDispatchToProps && mapDispatchToProps(dispatch)
            return (<Component
                {...props}
                state={state}
                dispatch={dispatch}
                {...addStateMaps}
                {...addDispatchMaps}>
                {props.children}
            </Component>)
        }}
    </Context.Consumer>
);
