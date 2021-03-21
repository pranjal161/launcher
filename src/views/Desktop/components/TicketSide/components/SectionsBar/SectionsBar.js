import React from 'react';
import {List, ListItem, makeStyles} from "@material-ui/core";
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
    },
}));


function SectionsBar({value, onChange}) {

    const classes = useStyles();
    const handleClick = (sectionId) => {
        onChange && onChange(sectionId)
    }

    const sections = [{id: 'info', icon: InfoIcon},
        {id: 'description', icon: SubjectIcon},
        {id: 'date', icon: DateRangeIcon},
        {id: 'notes', icon: SpeakerNotesIcon},
        {id: 'documents', icon: AttachFileIcon}]

    const selected = (id) => id === value
    return (
        <div className={classes.root}>
            <List component="nav" dense>
                {sections.map(section => {
                        const Obj = section.icon
                        return (<ListItem key={section.id} selected={selected(section.id)}><IconButton color="primary"
                                                                                                       onClick={() => handleClick(section.id)}><Obj/></IconButton></ListItem>)
                    }
                )}
            </List>
        </div>
    );
}

export default SectionsBar;
