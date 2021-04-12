import React, {useReducer} from 'react';
import {initialState, reducer, selectTicket, setCurrentSection} from "../../../../../store/contextualStore/store";

import AllTickets from "../../../../../components/Tickets/AllTickets/AllTickets";
import Context from "../../../../../store/contextualStore/Context";
import {Grid} from "@material-ui/core";
import TicketSide from "./components/TicketSide/TicketSide";
import {withTicketStore} from "../../../../../store/contextualStore/withTicketStore";

/*
const MyTicketsConnected = () => {
    //Connect the ticket list to the store
    const mapDispatchToProps = (dispatch) => ({
        onClick: (object) => dispatch(selectTicket(object.id))
    })

    const mapStateToProps = (state) => ({
        ticketId: state.ticketId,
    })

    const Impl = withTicketStore(MyTickets, mapStateToProps, mapDispatchToProps)
    return <Impl/>
}*/


const AllTicketsConnected = () => {
    //Connect the ticket list to the store
    const mapDispatchToProps = (dispatch) => ({
        onClick: (object) => dispatch(selectTicket(object.id))
    })

    const mapStateToProps = (state) => ({
        ticketId: state.ticketId,
    })

    const Impl = withTicketStore(AllTickets, mapStateToProps, mapDispatchToProps)
    return <Impl/>
}

const TicketSideConnected = () => {
    const mapStateToProps = (state) => ({
        id: state.ticketId,
        sectionId: state.sectionId
    })

    const mapDispatchToProps = (dispatch) => ({
        onSectionChange: (id) => dispatch(setCurrentSection(id)),
        onClose: () => dispatch(selectTicket(undefined))
    })
    const Impl = withTicketStore(TicketSide, mapStateToProps, mapDispatchToProps)
    return <Impl/>
}

const TicketListPage = () => {
    // I create a contextual store
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={{state, dispatch}}>
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={7}>
                        <AllTicketsConnected/>
                    </Grid>
                    <Grid item xs={5}>
                        <TicketSideConnected/>
                    </Grid>
                </Grid>
            </div>
        </Context.Provider>
    );
}

export default TicketListPage;
