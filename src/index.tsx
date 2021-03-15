import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './i18n';
import reportWebVitals from './reportWebVitals';
import {DxcSpinner} from '@dxc-technology/halstack-react';
import {Provider} from "react-redux";
import store from "./store/store";

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
                <App/>
            </Provider>
        </React.Suspense>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
