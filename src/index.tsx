import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './i18n';
import reportWebVitals from './reportWebVitals';
import {DxcSpinner} from '@dxc-technology/halstack-react';
import {Provider} from "react-redux";

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore' // make sure you add this for firestore
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import { firebase as fbConfig, rrfConfig} from "./config/config";
import configureStore from "./store/store2";

const initialState = {}
const store = configureStore(initialState)
// Initialize Firebase instance
firebase.initializeApp(fbConfig)


const loading = () => {

    return (
        <div className="spinner">
            <DxcSpinner
                margin="xxsmall"
                mode="overlay"/>
        </div>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <React.Suspense fallback={loading()}>
            <Provider store={store}>
                <ReactReduxFirebaseProvider
                    firebase={firebase}
                    config={rrfConfig}
                    dispatch={store.dispatch}
                    createFirestoreInstance={createFirestoreInstance}>
                    <App />
                </ReactReduxFirebaseProvider>
            </Provider>
        </React.Suspense>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
