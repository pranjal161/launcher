import "./App.scss";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import {AlertContext, AlertContextProvider} from "./context/alertContext";
import React, {useEffect} from "react";
import routes, { applyRoutes } from './routes';

import Alert from "./components/Alert/Alert";
import {AppContextProvider} from "./context/applicationContext";
import {Colors} from "./styles/dxc-theme";
import { BrowserRouter as Router } from "react-router-dom";
import {ThemeProvider} from "@dxc-technology/halstack-react";
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
    // const [isLoading, setLoader] = useState(true);
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

    return (
        <>
            <AppContextProvider>
                <AlertContextProvider>
                    <ThemeProvider theme={Colors}>
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
                    </ThemeProvider>
                </AlertContextProvider>
            </AppContextProvider>
        </>
    );
}

export default App;
