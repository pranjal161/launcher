import BasketFormDialog from "components/Baskets/BasketFormDialog/BasketFormDialog";
import {Button} from "@material-ui/core";
import PropTypes from 'prop-types'
import React from 'react';
import useDeskBaskets from "data/hooks/useDeskBaskets";

/**
 * Display of update basket button
 * @param {basket} props: { basket } The basket which is concerned by the update
 * @returns {*} Display of update basket button
 */
function UpdateButton(props: {basket: string}) {
    const { basket } = props;
    const [open, setOpen] = React.useState(false);
    const {update} = useDeskBaskets()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (basket: any) => {
        console.log('basket', basket)
        update(basket)
        handleClose()
    }

    return (
        <>
            <Button variant="contained" color="primary" className="mx-2" onClick={handleClickOpen}>
                Update
            </Button>
            {open && <BasketFormDialog basket={basket} close={handleClose} submit={handleSubmit}/>}
        </>
    );
}

UpdateButton.propTypes = {
    basket: PropTypes.string
}

export default UpdateButton;
