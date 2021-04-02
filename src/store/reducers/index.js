import aiaReducer from "./aiaReducer";
import authReducer from "./authReducer";
import basketReducer from "./basketReducer";
import {combineReducers} from "redux";
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";
import ticketReducer from "./ticketReducer";

const rootReducer = combineReducers(
    {
        auth: authReducer,
        firebase: firebaseReducer,
        firestore: firestoreReducer,
        tickets: ticketReducer,
        baskets: basketReducer,
        aia: aiaReducer
    }
)

export default rootReducer
