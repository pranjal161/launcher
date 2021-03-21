import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import {makeStyles} from '@material-ui/styles';
import {Card, CardContent, CardHeader, List, ListItem, Typography} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
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
    }
}));

const Summary = props => {
    const {ticket, className, ...rest} = props;

    const classes = useStyles();

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <CardHeader
                action={<CloseIcon/>}
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
                            {moment(ticket.deadlineDate).format('DD MMM YYYY')}
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
                        divider
                    >
                        <Typography variant="subtitle2">Status</Typography>
                        <Typography variant="h6">
                            {ticket.status}
                        </Typography>
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    );
};


export default Summary;
