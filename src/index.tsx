import './index.css';
import './i18n';
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore' // make sure you add this for firestore

import { firebase as fbConfig, rrfConfig } from "./config/config";

import App from './App';
import { DxcSpinner } from '@dxc-technology/halstack-react';
import { Provider } from "react-redux";
import React from 'react';
import ReactDOM from 'react-dom';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import configureStore from "./store/store2";
import { createFirestoreInstance } from 'redux-firestore'
import firebase from 'firebase/app'
import reportWebVitals from './reportWebVitals';

const initialState = {}
const store = configureStore(initialState)

// Initialize Firebase instance
firebase.initializeApp(fbConfig)

const loading = () => (
    <div className="spinner">
        <DxcSpinner
            margin="xxsmall"
            mode="overlay"/>
    </div>
)

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
