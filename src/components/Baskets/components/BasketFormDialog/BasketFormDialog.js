import React from 'react';
import {useForm} from "react-hook-form";
import useDeskUsers from "../../../../data/hooks/useDeskUsers";
import {useDeskAuth} from "../../../../data/hooks/useDeskAuth";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
    title: yup.string().required(),
});

function BasketFormDialog(props) {
    const {currentUserId} = useDeskAuth()
    const {getAll} = useDeskUsers()
    const allUsers = getAll()
    const {submit, basket}= props


    const defaultValues = basket ? basket : {
        requestBy: currentUserId,
        assignTo: currentUserId,
    }

    const allUsersToDisplay = allUsers && allUsers.map(user => <option
        key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>)

    const onSubmit = (updatedBasket) => {
        const completeBasket = basket ? {...basket, ...updatedBasket}:updatedBasket
        props.submit(completeBasket)
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
            <DialogTitle id="form-dialog-title">{basket?'Update a basket':'Create a basket'}</DialogTitle>
            <DialogContent>

                    <div className="form-group">
                        <label className=" control-label" htmlFor="title">Title</label>
                        <div className="">
                            <input id="title" name="title" type="text"
                                   className="form-control input-md" ref={register}/>
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

export default BasketFormDialog;
