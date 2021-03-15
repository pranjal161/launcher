import authReducer from "./authReducer";
import {combineReducers} from "redux";
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "react-redux-firebase";

const rootReducer = combineReducers(
    {
        auth : authReducer,
        firebase : firebaseReducer,
    firestore : firestoreReducer}
)

export default rootReducer
