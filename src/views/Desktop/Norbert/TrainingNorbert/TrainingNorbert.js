import React, {useReducer} from 'react';

import TicketSide from "../../components/TicketSide/TicketSide";
import {Grid} from "@material-ui/core";
import MyTickets from "../../../../components/Tickets/MyTickets";
import {withTicketStore} from "./components/LocalStore/withTicketStore";
import Context from "./components/LocalStore/Context";
import {initialState, reducer, selectTicket, setCurrentSection} from "./components/LocalStore/store";


const MyTicketsConnected = () => {
    //Bound the ticket list to the store
    const mapDispatchToProps = (dispatch) => ({
        onClick: (object) => dispatch(selectTicket(object.id))
    })

    const mapStateToProps = (state) => ({
        ticketId: state.ticketId,
    })

    const Impl = withTicketStore(MyTickets, mapStateToProps, mapDispatchToProps)
    return <Impl/>
}

const TicketSideConnected = () => {
    const mapStateToProps = (state) => ({
        id: state.ticketId,
        sectionId: state.sectionId
    })

    const mapDispatchToProps = (dispatch) => ({
        onSectionChange: id => dispatch(setCurrentSection(id)),
        onClose: () => dispatch(selectTicket(undefined))
    })
    const Impl = withTicketStore(TicketSide, mapStateToProps, mapDispatchToProps)
    return <Impl/>
}

function TrainingNorbert(props) {
    // I create a contextual store
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={{state, dispatch}}>
            <Grid container spacing={3}>
                <Grid item xs={7}>
                    <MyTicketsConnected/>
                </Grid>
                <Grid item xs={5}>
                    <TicketSideConnected/>
                </Grid>
            </Grid>
        </Context.Provider>
    );
}

export default TrainingNorbert;
