import * as yup from "yup";

import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";

import React from 'react';
import useDeskAuth from "../../../../data/hooks/useDeskAuth";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';

const schema = yup.object().shape({
    title: yup.string().required(),
});

/**
 * Available actions for a basket
 * @param {props} props Information of the basket
 * @returns {void} Display available action for the basket
 */
function BasketFormDialog(props) {
    const {currentUserId} = useDeskAuth()
    const {basket} = props

    const defaultValues = basket ? basket : {
        requestBy: currentUserId,
        assignTo: currentUserId,
    }

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
                <DialogTitle id="form-dialog-title">{basket ? 'Update a basket' : 'Create a basket'}</DialogTitle>
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

BasketFormDialog.propTypes = {
    basket: PropTypes.string,
    submit: PropTypes.func,
    close: PropTypes.func
}

export default BasketFormDialog;
