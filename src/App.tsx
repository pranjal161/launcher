import "./App.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Redirect, Route, Switch,} from "react-router-dom";
import axios from "axios";
import Alert from "./components/alert/alert";
import ClientView from "./pages/clientView/clientView";
import ContractSummary from "./pages/contractSummary/contractSummary";
import ExempleDesktopView from "./views/Desktop/Norbert/ExempleDesktopView";
import Header from "./components/header/header";
import HomePage from "./pages/homePage/homePage";
import React, {useState} from "react";
import SignIn from "./views/SignIn/SignIn";
import SignUp from "./views/SignUp/SignUp";
import useDeskSubscribe from "./data/hooks/useDeskSubscribe";
import {useTranslation} from "react-i18next";
import {DxcSpinner, ThemeContext} from "@dxc-technology/halstack-react";
import {AppContextProvider} from "./context/applicationContext";
import {AlertContext, AlertContextProvider} from "./context/alertContext";
import {Colors} from "./styles/dxc-theme";
import TrainingNorbert from "./views/Desktop/Norbert/TrainingNorbert/TrainingNorbert";


function App() {
    const {ready} = useTranslation();
    const [isLoading, setLoader] = useState(false);

    useDeskSubscribe({collection: 'tickets'})
    useDeskSubscribe({collection: 'baskets'})
    useDeskSubscribe({collection: 'users'})


    axios.interceptors.request.use(
        function (config) {
            // spinning start to show
            setLoader(true);
            return config;
        },
        function (error) {
            setLoader(false);
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
                            {isLoading && false && (
                                <div className="spinner">
                                    <DxcSpinner margin="xxsmall" mode="overlay"/>
                                </div>
                            )}
                        </>
                        <AlertContext.Consumer>
                            {(context) => {
                                return <Alert toastList={context.toastMessage}/>
                            }}
                        </AlertContext.Consumer>
                        <>
                            {ready && (
                                <Router basename="/omnichannel/react">
                                    <Header/>
                                    <Switch>
                                        <Route exact path="/">
                                            <Redirect to="/home"/>
                                        </Route>
                                        <Route path="/home" exact>
                                            <HomePage/>
                                        </Route>
                                        <Route path="/contracts/:contractId" exact>
                                            <ContractSummary/>
                                        </Route>
                                        <Route path="/clientView/person/:personId" exact>
                                            <ClientView/>
                                        </Route>
                                        <Route path="/clientView/organization/:organizationId" exact>
                                            {/* to test */}
                                            <ClientView/>
                                        </Route>
                                        <Route path="/signin" exact>
                                            <SignIn/>
                                        </Route>
                                        <Route path="/signup" exact>
                                            <SignUp/>
                                        </Route>
                                        <Route path="/exemple/desktop" exact>
                                            <ExempleDesktopView/>
                                        </Route>
                                        <Route path="/training/norbert" exact>
                                            <TrainingNorbert/>
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
