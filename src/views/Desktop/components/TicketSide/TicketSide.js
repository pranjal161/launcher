import React from 'react';
import SectionsBar from "./components/SectionsBar/SectionsBar";
import {Drawer, Grid} from "@material-ui/core";
import {withTicketStore} from "../../Norbert/TrainingNorbert/components/LocalStore/withTicketStore";
import TicketDetail from "../../../../components/Tickets/components/TicketDetail/TicketDetail";
import {setCurrentSection} from "../../Norbert/TrainingNorbert/components/LocalStore/store";

const TicketDetailBound = withTicketStore(TicketDetail, (state) => ({
    id: state.ticketId,
    sectionId: state.sectionId
}))


const SectionsBarBound = withTicketStore(SectionsBar, (state) => ({
    value: state.sectionId
}), (dispatch) => ({
    onChange: id => dispatch(setCurrentSection(id))
}))


function TicketSide({state}) {
    const open = (state.ticketId !== undefined)
    return (
        <Drawer open={open} anchor={"right"} variant={"persistent"}>
            <Grid container>
                <Grid item>
                    <SectionsBarBound/>
                </Grid>
                <Grid item>
                    <TicketDetailBound/>
                </Grid>
            </Grid>
        </Drawer>
    );
}

export default TicketSide;
