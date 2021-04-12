/* eslint-disable @typescript-eslint/no-var-requires */

import {applyMiddleware, compose, createStore} from 'redux'

import {getFirebase} from 'react-redux-firebase'
import {getFirestore} from "redux-firestore";
import rootReducer from "./reducers"
import thunk from 'redux-thunk'

/**
 * The store that is currently used 
 * @param {*} initialState Initial state of the store
 * @param {*} history History of the store
 * @returns {*} The store that is currently used
 */
export default function configureStore(initialState, history) {
    const middleware = [thunk.withExtraArgument({getFirebase, getFirestore})]
    const createStoreWithMiddleware = compose(
        applyMiddleware(...middleware),
        typeof window === 'object' &&
        typeof window.devToolsExtension !== 'undefined'
            ? () => window.__REDUX_DEVTOOLS_EXTENSION__
            : (f) => f
    )(createStore)
    const store = createStoreWithMiddleware(rootReducer)

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            // eslint-disable-next-line global-require
            const nextRootReducer = require('./reducers')
            store.replaceReducer(nextRootReducer)
        })
    }
    
    return store
}
