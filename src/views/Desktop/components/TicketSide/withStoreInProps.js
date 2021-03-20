import React from "react";

export const withStoreInProps = Context => Component => props => (
    <Context.Consumer>
        {({state, dispatch}) => (
            <Component {...props} state={state} dispatch={dispatch}>
                {props.children}
            </Component>
        )}
    </Context.Consumer>
);
