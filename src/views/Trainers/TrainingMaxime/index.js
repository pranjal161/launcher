import React from 'react';

import {useSelector} from "react-redux";

import HistoryImplement from "./components/HistoryImplement";
import "./index.scss"

const TrainingMaxime = () => {
    // const id = "ZWbCidiMasEx9ZHbe11W";
    const id = "bUibfxQIoJDlbMjGpZB0";
    // const id = "e1CPnld1KNGX2lHodyRR";
    // const id = "Edi1dN60i2O2eFm9zJ0f";
    // const id = "y270CCciTszudNrTtK6g";
    const ticket = useSelector((state) => (state.firestore.data.tickets?{id, ...state.firestore.data.tickets[id]}:undefined));
    const users = useSelector((state) => (state.firestore.data.users?{...state.firestore.data.users}:undefined));
    const baskets = useSelector((state) => (state.firestore.data.baskets?{...state.firestore.data.baskets}:undefined));

    // const ticket =  {
    //     id: "Edi1dN60i2O2eFm9zJ0f",
    //     deadlineDate: 1618378463911,
    //     requestBy: "y0skmr2bb4O9keSoLfwqOM1VMNp1",
    //     assignedToDisplay: "",
    //     description: "Test pour jeenal",
    //     receivedDate: 1618378463911,
    //     assignedTo: null,
    //     createdByDisplay: "Pranjal Shinde",
    //     title: "Test 2",
    //     basketId: "GMYM4alLq2VgrAs8EwtJ",
    //     createdBy: "y0skmr2bb4O9keSoLfwqOM1VMNp1",
    //     status: "pending",
    //     history: {
    //         1619078682000: {
    //             action: "assignedTo",
    //             newValue: "TtmUj7hHOQbpqxkS9Xj7Nk1azpx1",
    //             metadata: {
    //                 updatedByDisplay: "Norbert Pointu",
    //                 timestamp: 1619078682000,
    //                 updatedISODate: "2021-04-22T10:04:44+02:00",
    //                 updatedBy: "TtmUj7hHOQbpqxkS9Xj7Nk1azpx1"
    //             }
    //         },
    //         1618986180000: {
    //             action: "ticketUpdated",
    //             metadata: {
    //                 updatedByDisplay: "Norbert Pointu",
    //                 timestamp: 1618986180000,
    //                 updatedISODate: "2021-04-21T08:23:14+02:00",
    //                 updatedBy: "TtmUj7hHOQbpqxkS9Xj7Nk1azpx1"
    //             }
    //         },
    //         1618500344098: {
    //             action: "assignedTo",
    //             newValue: "TtmUj7hHOQbpqxkS9Xj7Nk1azpx1",
    //             metadata: {
    //                 updatedByDisplay: "Norbert Pointu",
    //                 timestamp: 1618500344098,
    //                 updatedISODate: "2021-04-15T17:25:44+02:00",
    //                 updatedBy: "TtmUj7hHOQbpqxkS9Xj7Nk1azpx1"
    //             }
    //         }
    //     }
    // }

    console.log(ticket?.history);

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

