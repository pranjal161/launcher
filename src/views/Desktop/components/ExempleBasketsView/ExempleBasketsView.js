import AllBaskets from "../../../../components/Baskets/AllBaskets";
import BasketDetail from "../../../../components/Baskets/components/BasketDetail/BasketDetail";
import CreateButton from "../../../../components/Baskets/components/CreateButton/CreateButton";
import MyBaskets from "../../../../components/Baskets/MyBaskets";
import React, {useState} from 'react';
import {Redirect} from "react-router-dom";
import useDeskBaskets from "../../../../data/hooks/useDeskBaskets";
import useDeskAuth from "../../../../data/hooks/useDeskAuth";

function ExempleBasketsView() {
    const [clickedBaskets, setclickedBaskets] = useState({})
    const {remove} = useDeskBaskets()
    const {auth} = useDeskAuth()
    if (!auth.logged)
        return (<Redirect to="/signIn"/>)

    const handleBasketClick = (basket) => {
        setclickedBaskets({...clickedBaskets, [basket.id]: basket})
    }
    const handleRemove = (id) => {
        const newAfterDelete = {...clickedBaskets}
        delete newAfterDelete[id]
        remove(id)
        setclickedBaskets(newAfterDelete)
    }


    return (
        <div>
            <div className="row">
                <div className="col-4">
                    All backets
                    <AllBaskets handleBasketClick={handleBasketClick}/>
                </div>
                <div className="col-4">
                    My baskets (assigned to me)
                    <CreateButton/>
                    <MyBaskets handleBasketClick={handleBasketClick}/>
                </div>
                <div className="col-4">
                    Clicked baskets
                    {clickedBaskets && Object.values(clickedBaskets).map(basket=> <BasketDetail id={basket.id} key={basket.id} remove={handleRemove}/>)}
                </div>
            </div>
        </div>
    );
}

export default ExempleBasketsView;
