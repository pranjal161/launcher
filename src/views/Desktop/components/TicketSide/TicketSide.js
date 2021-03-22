import React from 'react';
import SectionsBar from "./components/SectionsBar/SectionsBar";
import {Drawer, Grid} from "@material-ui/core";
import TicketDetail from "../../../../components/Tickets/components/TicketDetail/TicketDetail";

function TicketSide({id, sectionId, onSectionChange, onClose}) {
    const open = (id !== undefined)
    //console.log('TicketSide render')
    return (
        <Drawer open={open} anchor={"right"} variant={"persistent"}>
            <Grid container>
                <Grid item>
                    <SectionsBar value={sectionId} onChange={onSectionChange}/>
                </Grid>
                <Grid item>
                    <TicketDetail id={id} sectionId={sectionId} onClose={onClose}/>
                </Grid>
            </Grid>
        </Drawer>
    );
}

export default TicketSide;
