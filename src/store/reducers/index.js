import authReducer from "./authReducer";
import {combineReducers} from "redux";
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";
import ticketReducer from "./ticketReducer";
import basketReducer from "./basketReducer";

const rootReducer = combineReducers(
    {
        auth: authReducer,
        firebase: firebaseReducer,
        firestore: firestoreReducer,
        tickets: ticketReducer,
        baskets: basketReducer
    }
)

export default rootReducer
