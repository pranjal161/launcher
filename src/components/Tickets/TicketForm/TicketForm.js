import React from 'react';
import {useForm} from "react-hook-form";
import useDeskUsers from "../../../data/hooks/useDeskUsers";
import {useDeskAuth} from "../../../data/hooks/useDeskAuth";

function TicketForm(props) {
    const {register, handleSubmit} = useForm();
    const {currentUserId} = useDeskAuth()
    const {getAll} = useDeskUsers()
    const allUsers = getAll()
    const allUsersToDisplay = allUsers && allUsers.map(user => <option
        key={user.uid} value={user.uid}>{user.firstName} {user.lastName}</option>)
    const onSubmit = (data) => console.log(JSON.stringify(data));

    if (props.requestSubmit)
    {
        document.forms[0].submit()
    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                        <select id="requestBy" name="requestBy" className="form-control" ref={register}
                                defaultValue={currentUserId}>
                            {allUsersToDisplay}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label className=" control-label" htmlFor="assignedTo">Assigned To</label>
                    <div className="">
                        <select id="assignedTo" name="assignedTo" className="form-control" ref={register}>
                            {allUsersToDisplay}
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label className=" control-label" htmlFor="basketId">Basket</label>
                    <div className="">
                        <select id="basketId" name="basketId" className="form-control" ref={register}>
                            <option value="1">Option one</option>
                            <option value="2">Option two</option>
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
            </form>
        </div>
    );
}

export default TicketForm;
