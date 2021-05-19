import "./App.scss";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import {AlertContext, AlertContextProvider} from "./context/alertContext";
import {DxcSpinner, ThemeContext} from "@dxc-technology/halstack-react";
import React, {useEffect, useState} from "react";
import routes, { applyRoutes } from './routes';

import Alert from "./components/Alert/Alert";
import {AppContextProvider} from "./context/applicationContext";
import {Colors} from "./styles/dxc-theme";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import {currentDailyUpdatesId} from "./store/actions/ticketActions";
import useDeskSubscribe from "./data/hooks/useDeskSubscribe";
import useGlobalSearchData from "data/hooks/useGlobalSearchData";
import {useTranslation} from "react-i18next";

/**
 * Main app
 * @returns {*} The app depending on the context
 */
function App() {
    const {ready} = useTranslation();
    const [isLoading, setLoader] = useState(false);
    const routeNodes = applyRoutes(routes);
    const {loadData} = useGlobalSearchData();

    //Please don't touch
    useDeskSubscribe({collection: 'tickets'})
    useDeskSubscribe({collection: 'baskets'})
    useDeskSubscribe({collection: 'users'})
    useDeskSubscribe({collection: 'dailyUpdates', doc: currentDailyUpdatesId})

    // Load Global Search Data
    useEffect(() => {
        loadData({collection: 'person'});
        loadData({collection: 'contract'});
    }, []);

    axios.interceptors.request.use(
        function (config) {
            // Spinning start to show
            //setLoader(true);
            return config;
        },
        function (error) {
            //setLoader(false);
            return Promise.reject(error);
        }
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
        }
    );

    return (
        <>
            <AppContextProvider>
                <AlertContextProvider>
                    <ThemeContext.Provider value={Colors}>
                        <>
                            {isLoading && (
                                <div className="spinner">
                                    <DxcSpinner margin="xxsmall" mode="overlay"/>
                                </div>
                            )}
                        </>
                        <AlertContext.Consumer>
                            {(context) => <Alert toastList={context.toastMessage}/>}
                        </AlertContext.Consumer>
                        <>

                            {
                                ready && 
                                    <Router basename="/omnichannel/react">
                                        {routeNodes}
                                    </Router>
                            }

                        </>
                    </ThemeContext.Provider>
                </AlertContextProvider>
            </AppContextProvider>
        </>
    );
}

export default App;
