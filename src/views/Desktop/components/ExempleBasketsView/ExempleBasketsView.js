import React, {useState} from 'react';
import AllBaskets from "../../../../components/Baskets/AllBaskets";
import CreateButton from "../../../../components/Baskets/components/CreateButton/CreateButton";
import MyBaskets from "../../../../components/Baskets/MyBaskets";
import BasketDetail from "../../../../components/Baskets/components/BasketDetail/BasketDetail";
import useDeskBaskets from "../../../../data/hooks/useDeskBaskets";
import {useDeskAuth} from "../../../../data/hooks/useDeskAuth";
import {Redirect} from "react-router-dom";

function ExempleBasketsView(props) {
    const [clickedBaskets, setclickedBaskets] = useState({})
    const {create, remove} = useDeskBaskets()
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
                    <CreateButton></CreateButton>
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
