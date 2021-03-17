import "./App.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import ContractSummary from "./pages/contractSummary/contractSummary";
import HomePage from "./pages/homePage/homePage";
import ClientView from "./pages/clientView/clientView";
import Header from "./components/header/header";
import axios from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { DxcSpinner } from "@dxc-technology/halstack-react";
import { AppContextProvider } from "./context/applicationContext";
import { ThemeContext } from "@dxc-technology/halstack-react";
import { Colors } from "../src/styles/dxc-theme";

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
        <ThemeContext.Provider value={Colors}>
      <>
        {isLoading && (
          <div className="spinner">
            <DxcSpinner margin="xxsmall" mode="overlay" />
          </div>
        )}

      </>
      <>
        {ready && (
          <Router basename={'/omnichannel/react'}>
            <Header />
            <Switch>
              <Route exact path={'${process.env.PUBLIC_URL}/'}>
                <Redirect to="/home" />
              </Route>
              <Route path={'${process.env.PUBLIC_URL}/home'} exact>
                <HomePage />
              </Route>
              <Route path={'${process.env.PUBLIC_URL}/contracts/:contractId'} exact>
                <ContractSummary />
              </Route>
              <Route path={'${process.env.PUBLIC_URL}/clientView/person/:personId'} exact>
                <ClientView />
              </Route>
              <Route path={'${process.env.PUBLIC_URL}/clientView/organization/:organizationId'} exact>
                {/* to test */}
                <ClientView />
              </Route>
            </Switch>
          </Router>
        )}
      </>
        </ThemeContext.Provider>
      </AppContextProvider>
    </>
  );
}

export default App;
