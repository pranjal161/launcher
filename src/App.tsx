import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import ContractSummary from './pages/contractSummary/contractSummary';
import HomePage from './pages/homePage/homePage';
import Header from './components/header/header';
import axios from 'axios';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DxcSpinner } from '@dxc-technology/halstack-react';
function App() {
  const { ready } = useTranslation();
  const [isLoading, setLoader] = useState(false)

  axios.interceptors.request.use(function (config) {
    // spinning start to show
    setLoader(true)
    return config
  }, function (error) {
    setLoader(false)
    return Promise.reject(error);
  });

  axios.interceptors.response.use(function (response) {
    // spinning hide
    setLoader(false)

    return response;
  }, function (error) {
    setLoader(false)
    return Promise.reject(error);
  });

  return (
    <>
      <Header />
      <>
        {
          isLoading && (
            <div className="spinner">
              <DxcSpinner
                margin="xxsmall"
                mode="overlay" />
            </div>

          )
        }
      </>
      <>
        {
          ready && (
            <Router>
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
              </Switch>
            </Router>
          )
        }
      </>
    </>
  );
}

export default App;
