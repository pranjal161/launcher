import React from "react";

export const withStoreInProps = Context => (Component, mapStateToProps) => props => (
    <Context.Consumer>
        {({state, dispatch}) => {
            const res = mapStateToProps && mapStateToProps(state)
            return (<Component {...props} state={state} dispatch={dispatch} {...res}>
                {props.children}
            </Component>)
        }}
    </Context.Consumer>
);
