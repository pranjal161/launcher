import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import React from 'react';
import useDeskAuth from "../../../data/hooks/useDeskAuth";
import useDeskBaskets from "../../../data/hooks/useDeskBaskets";
import useDeskUsers from "../../../data/hooks/useDeskUsers";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";


const schema = yup.object().shape({
    title: yup.string().required(),
    requestBy: yup.string().required(),
    assignedTo: yup.string().required(),
    basketId: yup.string(),
    description: yup.string(),
    status: yup.string().required(),
    notes: yup.string(),
    deadline: yup.string(),
    stage: yup.number()
});

function TicketFormDialog(props) {
    const {currentUserId} = useDeskAuth()
    const {getAll} = useDeskUsers()
    const {getAll: getAllBaskets} = useDeskBaskets()
    const allUsers = getAll()
    const allBaskets = getAllBaskets()
    const {ticket} = props


    const defaultValues = ticket ? ticket : {
        requestBy: currentUserId,
        assignTo: currentUserId,
    }

    const usersOptions = allUsers && allUsers.map(user => <option
        key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>)

    const basketsOptions = allBaskets && allBaskets.map(basket => <option
        key={basket.id} value={basket.id}>{basket.title} </option>)


    const onSubmit = (updatedTicket) => {
        const completeTicket = ticket ? {...ticket, ...updatedTicket}:updatedTicket
        props.submit(completeTicket)
    }

    const onError = (errors, e) => console.log(errors, e);

    const {register, handleSubmit} = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    });

    const handleClose = () => {
        props.close()
    }

    return (
        <Dialog open={true} aria-labelledby="form-dialog-title" fullWidth={true}>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <DialogTitle id="form-dialog-title">{ticket ? 'Update a ticket' : 'Create a ticket'}</DialogTitle>
                <DialogContent>

                    <div className="form-group">
                        <label className=" control-label" htmlFor="title">Title</label>
                        <div className="">
                            <input id="title" name="title" type="text"
                                   className="form-control input-md" ref={register}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className=" control-label" htmlFor="requestBy">Request by</label>
                        <div className="">
                            <select id="requestBy" name="requestBy" className="form-control" ref={register}>
                                {usersOptions}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className=" control-label" htmlFor="assignedTo">Assigned To</label>
                        <div className="">
                            <select id="assignedTo" name="assignedTo" className="form-control" ref={register}>
                                {usersOptions}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className=" control-label" htmlFor="basketId">Basket</label>
                        <div className="">
                            <select id="basketId" name="basketId" className="form-control" ref={register}>
                                {basketsOptions}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className=" control-label" htmlFor="description">Description</label>
                        <div className="">
                        <textarea className="form-control" id="description" name="description"
                                  ref={register}></textarea>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className=" control-label" htmlFor="deadline">Deadline</label>
                        <div className="">
                        <input id="deadline" name="deadline" type="date"
                                   className="form-control input-md" ref={register}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className=" control-label" htmlFor="stage">Stage (%)</label>
                        <div className="">
                        <input id="stage" name="stage"
                                   className="form-control input-md" ref={register}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className=" control-label" htmlFor="status">Status</label>
                        <div className="">
                            <select id="status" name="status" className="form-control" ref={register}
                                    defaultValue={"created"}>
                                <option value="created">Created</option>
                                <option value="pending">Pending</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className=" control-label" htmlFor="notes">Notes</label>
                        <div className="">
                            <textarea className="form-control" id="notes" name="notes" ref={register}></textarea>
                        </div>
                    </div>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="default">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary" variant={"contained"}>
                        Validate
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default TicketFormDialog;
