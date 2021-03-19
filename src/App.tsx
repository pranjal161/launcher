import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { AlertContext, AlertContextProvider } from './context/alertContext';
import { DxcSpinner, ThemeContext } from '@dxc-technology/halstack-react';
import React, { useState } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Alert from './components/alert/alert';
import { AppContextProvider } from './context/applicationContext';
import ClientView from './pages/clientView/clientView';
import { Colors } from '../src/styles/dxc-theme';
import ContractSummary from './pages/contractSummary/contractSummary';
import Header from './components/header/header';
import HomePage from './pages/homePage/homePage';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

/**
 * Main app
 * @returns {void} The app depending on the context
 */
function App() {
    const { ready } = useTranslation();
    const [isLoading, setLoader] = useState(false);

    axios.interceptors.request.use(
        function (config) {
            // spinning start to show
            setLoader(true);
            return config;
        },
        function (error) {
            setLoader(false);
            return Promise.reject(error);
        },
    );

    axios.interceptors.response.use(
        function (response) {
            // spinning hide
            setLoader(false);

            return response;
        },
        function (error) {
            setLoader(false);
            return Promise.reject(error);
        },
    );

    return (
        <>
            <AppContextProvider>
                <AlertContextProvider>
                    <ThemeContext.Provider value={Colors}>
                        <>
                            {isLoading && (
                                <div className="spinner">
                                    <DxcSpinner margin="xxsmall" mode="overlay" />
                                </div>
                            )}
                        </>
                        <AlertContext.Consumer>
                            {(context) => <Alert toastList={context.toastMessage} />}
                        </AlertContext.Consumer>
                        <>
                            {ready && (
                                <Router basename="/omnichannel/react">
                                    <Header />
                                    <Switch>
                                        <Route exact path="/">
                                            <Redirect to="/home" />
                                        </Route>
                                        <Route path="/home" exact>
                                            <HomePage />
                                        </Route>
                                        <Route path="/contracts/:contractId" exact>
                                            <ContractSummary />
                                        </Route>
                                        <Route path="/clientView/person/:personId" exact>
                                            <ClientView />
                                        </Route>
                                        <Route path="/clientView/organization/:organizationId" exact>
                                            {/* to test */}
                                            <ClientView />
                                        </Route>
                                    </Switch>
                                </Router>
                            )}
                        </>
                    </ThemeContext.Provider>
                </AlertContextProvider>
            </AppContextProvider>
        </>
    );
}

export default App;
