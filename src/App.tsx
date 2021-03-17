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
import { Colors} from "./styles/dxc-theme";
import SignIn from "./views/SignIn/SignIn";
import SignUp from "./views/SignUp/SignUp";
import ExempleDesktopView from "./views/Desktop/ExempleDesktopView";

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
          <Router>
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
              <Route path="/signin" exact>
                <SignIn />
              </Route>
              <Route path="/signup" exact>
                <SignUp/>
              </Route>
              <Route path="/exemple/desktop" exact>
                <ExempleDesktopView/>
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
