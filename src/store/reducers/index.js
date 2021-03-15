import authReducer from "./authReducer";
import {combineReducers} from "redux";
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";
import ticketReducer from "./ticketReducer";

const rootReducer = combineReducers(
    {
        auth : authReducer,
        firebase : firebaseReducer,
        firestore: firestoreReducer,
        tickets : ticketReducer}
)

export default rootReducer
