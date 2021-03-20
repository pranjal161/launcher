import React from 'react';
import Toolbar from "./components/Sidebar/Toolbar";
import {Drawer, Grid} from "@material-ui/core";
import {withTicketStore} from "../../Norbert/LocalStore/withTicketStore";
import TicketDetail from "../../../../components/Tickets/components/TicketDetail/TicketDetail";

function TicketSide({state}) {
    const mapStateToProps = (state) => ({
        id: state.ticketId,
        sectionId: state.sectionId
    })
    const TicketDetailBound = withTicketStore(TicketDetail, mapStateToProps)
    const ToolbarBound = withTicketStore(Toolbar)
    return (
        <Drawer open={state.ticketId} anchor={"right"} variant={"persistent"}>
            <Grid container>
                <Grid item>
                    <ToolbarBound/>
                </Grid>
                <Grid item>
                    <TicketDetailBound/>
                </Grid>
            </Grid>
        </Drawer>
    );
}

export default TicketSide;
