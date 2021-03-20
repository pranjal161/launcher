import React, {useReducer} from 'react';

function Proxy({storeHandler: {reducer, initialState, Context}, children}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const proxyStore = {state, dispatch}
    return (
        <Context.Provider value={proxyStore}>
            {children}
        </Context.Provider>
    );
}

export default Proxy;
