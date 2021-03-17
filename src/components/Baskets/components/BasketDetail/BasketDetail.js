import React from 'react';
import UpdateButton from "../UpdateButton/UpdateButton";
import useDeskBaskets from "../../../../data/hooks/useDeskBaskets";
import useDeskAuth from "../../../../data/hooks/useDeskAuth";


function BasketDetail({id, remove}) {
    const {getOne, assignUser, removeUser} = useDeskBaskets()
    const {currentUserId} = useDeskAuth()

    let basket = id ? getOne(id) : undefined

    console.log('basket.assignedToList', basket && basket.assignedToList)
    const assignButton = basket && basket.assignedToList.includes(currentUserId) ?
        <a href="#" className="btn btn-warning ml-2" onClick={() => removeUser(id, currentUserId) }>Unassign to me</a>:
        <a href="#" className="btn btn-info ml-2" onClick={() => assignUser(id, currentUserId) }>Assign to me</a>

    if (basket)
        basket.assignedToList.includes(currentUserId)

    if (basket) {
        return (
            <div className="card mt-3" >
                    <div className="card-body">
                        <h5 className="card-title">{basket.title}</h5>
                        <p className="card-text">
                            <small>{basket.id}</small>
                        </p>
                        <a href="#" className="btn btn-danger" onClick={() => remove(id) }>Remove</a>
                        {assignButton}
                        <UpdateButton basket={basket}/>
                    </div>
            </div>
        )
    } else
        return (<div className="container center">Loading basket ...</div>)
}


export default BasketDetail;

