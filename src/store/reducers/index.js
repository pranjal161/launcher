import aiaReducer from "./aiaReducer";
import authReducer from "./authReducer";
import basketReducer from "./basketReducer";
import {combineReducers} from "redux";
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";
import popupWindowTabsReducer from "./popupWindowTabsReducer";
import ticketReducer from "./ticketReducer";
import userReducer from "./userReducer";

const reducers = combineReducers(
    {
        auth: authReducer,
        firebase: firebaseReducer,
        firestore: firestoreReducer,
        tickets: ticketReducer,
        baskets: basketReducer,
        users: userReducer,
        aia: aiaReducer,
        popupWindow: popupWindowTabsReducer
    }
)

export default reducers
