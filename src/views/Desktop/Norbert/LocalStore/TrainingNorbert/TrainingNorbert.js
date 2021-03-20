import React, {useReducer} from 'react';

import TicketSide from "../../../components/TicketSide/TicketSide";
import {Grid} from "@material-ui/core";
import MyTickets from "../../../../../components/Tickets/MyTickets";
import {withTicketStore} from "../withTicketStore";
import Context from "../Context";
import {initialState, reducer} from "../store";


function TrainingNorbert(props) {
    // I create a local store and promote it to all children under TrainingNorbert
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
