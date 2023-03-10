import {Drawer, Grid} from "@material-ui/core";

import PreviewContainer from "../../../../../../../components/Tickets/PreviewContainer/PreviewContainer";
import PropTypes from 'prop-types'
import React from 'react';
import SectionsBar from "./components/SectionsBar/SectionsBar";

/**
 * Information on the ticket
 * @param {param} id, sectionId, onSectionChange, onClose for the ticket
 * @returns {*} Information on the ticket
 */
function TicketSide({id, sectionId, onSectionChange, onClose}) {
    const open = (id !== undefined)

    return (
        <Drawer open={open} anchor={"right"} variant={"persistent"}>
            <Grid container>
                <Grid item>
                    <SectionsBar value={sectionId} onChange={onSectionChange}/>
                </Grid>
                <Grid item>
                    <PreviewContainer id={id} sectionId={sectionId} onClose={onClose}/>
                </Grid>
            </Grid>
        </Drawer>
    );
}

TicketSide.propTypes = {
    id: PropTypes.string,
    sectionId: PropTypes.string,
    onSectionChange: PropTypes.func,
    onClose: PropTypes.func
}

export default TicketSide;
