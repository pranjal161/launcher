import React from 'react';

import {useSelector} from "react-redux";

import HistoryImplement from "./components/HistoryImplement";
import "./index.scss"

const TrainingMaxime = () => {
    const id = "ZWbCidiMasEx9ZHbe11W";
    // const id = "bUibfxQIoJDlbMjGpZB0";
    // const id = "e1CPnld1KNGX2lHodyRR";
    // const id = "Edi1dN60i2O2eFm9zJ0f";
    const ticket = useSelector((state) => (state.firestore.data.tickets?{id, ...state.firestore.data.tickets[id]}:undefined));
    const users = useSelector((state) => (state.firestore.data.users?{...state.firestore.data.users}:undefined));
    const baskets = useSelector((state) => (state.firestore.data.baskets?{...state.firestore.data.baskets}:undefined));

   return (
       <div className="training-maxime-container">
           {
               ticket && baskets && 
                 <HistoryImplement ticket={ticket} users={users} basketName={baskets[ticket.basketId].title}/>
           }
           
       </div>
   )
};
export default TrainingMaxime;

