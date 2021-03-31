import {List, ListItem, makeStyles} from "@material-ui/core";

import AttachFileIcon from '@material-ui/icons/AttachFile';
import DateRangeIcon from '@material-ui/icons/DateRange';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import PropTypes from 'prop-types'
import React from 'react';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotesOutlined';
import SubjectIcon from '@material-ui/icons/Subject';

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

/**
 * Information of sections
 * @param {param} value, onChange Id of the section and action on the click on the section bar
 * @returns {*} Display the sections bar with information
 */
function SectionsBar({value, onChange}) {

    const classes = useStyles();
    const handleClick = (sectionId) => {
        onChange && onChange(sectionId)
    }
    //console.log('SectionsBar detail render')

    const sections = [{id: 'info', icon: InfoIcon},
        {id: 'description', icon: SubjectIcon},
        {id: 'date', icon: DateRangeIcon},
        {id: 'notes', icon: SpeakerNotesIcon},
        {id: 'documents', icon: AttachFileIcon}]

    const selected = (id) => id === value
    
    return (
        <div className={classes.root}>
            <List component="nav" dense>
                {sections.map((section) => {
                    const Obj = section.icon
                    return (<ListItem key={section.id} selected={selected(section.id)}><IconButton color="primary"
                        onClick={() => handleClick(section.id)}><Obj/></IconButton></ListItem>)
                }
                )}
            </List>
        </div>
    );
}

SectionsBar.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default SectionsBar;
