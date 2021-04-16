import React from 'react';

import {useSelector} from "react-redux";

import HistoryImplement from "./components/HistoryImplement";
import "./index.scss"

const TrainingMaxime = () => {
    const id = "ZWbCidiMasEx9ZHbe11W"
    const ticket = useSelector((state) => (state.firestore.data.tickets?{id, ...state.firestore.data.tickets[id]}:undefined));

   return (
       <div className="training-maxime-container">
           <HistoryImplement ticket={ticket}/>
       </div>
   )
};
export default TrainingMaxime;

