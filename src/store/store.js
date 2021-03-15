import rootReducer from "./reducers";
import {applyMiddleware, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import {getFirebase, reactReduxFirebase} from "react-redux-firebase";
import {getFirestore, reduxFirestore} from 'redux-firestore'
import configuredFirebase from "../config/firebaseConfig";

const store = createStore(rootReducer,
    composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        reduxFirestore(configuredFirebase),
        reactReduxFirebase(configuredFirebase, {useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true})
    ))
export default store
