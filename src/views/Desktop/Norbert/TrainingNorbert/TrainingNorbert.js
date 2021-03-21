import React, {useReducer} from 'react';

import TicketSide from "../../components/TicketSide/TicketSide";
import {Grid} from "@material-ui/core";
import MyTickets from "../../../../components/Tickets/MyTickets";
import {withTicketStore} from "./components/LocalStore/withTicketStore";
import Context from "./components/LocalStore/Context";
import {initialState, reducer} from "./components/LocalStore/store";


function TrainingNorbert(props) {
    // I create a contextual store
    const [state, dispatch] = useReducer(reducer, initialState);
    const MyTicketsBound = withTicketStore(MyTickets)
    const TicketSideBound = withTicketStore(TicketSide)

    return (
        <Context.Provider value={{state, dispatch}}>
            <Grid container spacing={3}>
                <Grid item xs={7}>
                    <MyTicketsBound></MyTicketsBound>
                </Grid>
                <Grid item xs={5}>
                    <TicketSideBound/>
                </Grid>
            </Grid>
        </Context.Provider>
    );
}

export default TrainingNorbert;
