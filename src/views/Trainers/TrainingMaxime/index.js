import React from 'react';

import {useSelector} from "react-redux";

import HistoryImplement from "./components/HistoryImplement";
import "./index.scss"

const TrainingMaxime = () => {
    const id = "ZWbCidiMasEx9ZHbe11W"
    const ticket = useSelector((state) => (state.firestore.data.tickets?{id, ...state.firestore.data.tickets[id]}:undefined));
    const users = useSelector((state) => (state.firestore.data.users?{...state.firestore.data.users}:undefined));

   return (
       <div className="training-maxime-container">
           <HistoryImplement ticket={ticket} users={users}/>
       </div>
   )
};
export default TrainingMaxime;

