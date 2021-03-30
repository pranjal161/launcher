import {Card, CardActions, CardContent, CardHeader, List, ListItem, Typography} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';
import moment from 'moment';

const useStyles = makeStyles(() => ({
    root: {},
    header: {
        paddingBottom: 0
    },
    content: {
        paddingTop: 0
    },
    listItem: {
        padding: '2px',
        justifyContent: 'space-between'
    },
}));

const OLD_Summary = (props) => {
    const {ticket, className, actions, onClose, sectionId, ...rest} = props;

    const classes = useStyles();

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <CardHeader
                action={<CloseIcon onClick={onClose}/>}
                className={classes.header}
                disableTypography
                title={
                    <Typography
                        display="block"
                        variant="overline"
                    >
                        Ticket
                    </Typography>
                }
                subheader={ticket.title}
            />
            <CardContent className={classes.content}>
                <List dense>
                    <ListItem
                        className={classes.listItem}
                        disableGutters
                        dense={true}
                    >
                        <Typography variant="subtitle2">Deadline</Typography>
                        <Typography variant="h6">
                            {moment(ticket.deadline).format('DD MMM YYYY')}
                        </Typography>
                    </ListItem>
                    <ListItem
                        className={classes.listItem}
                        disableGutters
                        dense
                    >
                        <Typography variant="subtitle2">Created by </Typography>
                        <Typography variant="h6">
                            {ticket.creatorDisplay}
                        </Typography>
                    </ListItem>
                    <ListItem
                        className={classes.listItem}
                        disableGutters
                        dense
                    >
                        <Typography variant="subtitle2">Description</Typography>
                        <Typography variant="h6">
                            {ticket.description}
                        </Typography>
                    </ListItem>
                    <ListItem
                        className={classes.listItem}
                        disableGutters
                    >
                        <Typography variant="subtitle2">Status</Typography>
                        <Typography variant="h6">
                            {ticket.status}
                        </Typography>
                    </ListItem>
                    <ListItem
                        className={classes.listItem}
                        disableGutters
                    >
                        <Typography variant="subtitle2">Selected section</Typography>
                        <Typography variant="h6">
                            {sectionId}
                        </Typography>
                    </ListItem>

                </List>
            </CardContent>
            {actions && <CardActions>{actions}</CardActions>}
        </Card>
    );
};

Summary.propTypes = {
    ticket: PropTypes.string,
    className: PropTypes.string,
    actions: PropTypes.string,
    onClose: PropTypes.func,
    sectionId: PropTypes.string
}

export default OLD_Summary;
