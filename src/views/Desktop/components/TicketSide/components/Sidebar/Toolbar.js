import React from 'react';
import {makeStyles} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';

import InfoIcon from '@material-ui/icons/Info';
import SubjectIcon from '@material-ui/icons/Subject';
import DateRangeIcon from '@material-ui/icons/DateRange';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotesOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginLeft: theme.spacing(1),
            flexGrow: 1,
        },
        display: 'inline-flex',
        flexDirection: 'column',
        height: '100%',
        width: '20px'
    },
}));

function Sidebar({state, dispatch}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <IconButton color="primary">
                <InfoIcon/>
            </IconButton>
            <IconButton color="primary">
                <SubjectIcon/>
            </IconButton>
            <IconButton color="primary">
                <DateRangeIcon/>
            </IconButton>
            <IconButton color="primary">
                <SpeakerNotesIcon/>
            </IconButton>
            <IconButton color="primary">
                <AttachFileIcon/>
            </IconButton>
        </div>
    );
}

export default Sidebar;
