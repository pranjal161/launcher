export const create = (ticket) => {
    return (dispatch, getState, {getFirebase,}) => {
        dispatch({type: 'CREATE_BASKET_PENDING', ticket})
        const firestore = getFirebase().firestore()
        console.log('getState()', getState())
        const creatorId = getState().auth.id
        return firestore.collection('baskets').add({assignedToList: [], ...ticket,  creatorId })
            .then((result) => {
                dispatch({type: 'CREATE_BASKET_SUCCESS', result})
            }).catch(error => {
                console.log(error)
                dispatch({type: 'CREATE_BASKET_ERROR', error})
            })
    }
}


export const update = (ticket) => {
    return (dispatch, getState, {getFirebase}) => {
        dispatch({type: 'UPDATE_BASKET_PENDING'})
        const firestore = getFirebase().firestore()
        return firestore.collection('baskets').doc(ticket.id).update(ticket)
            .then((result) => {
                dispatch({type: 'UPDATE_BASKET_SUCCESS', result})
            }).catch(error => {
                console.log(error)
                dispatch({type: 'UPDATE_BASKET_ERROR', error})
            })
    }
}

export const remove = (id) => {
    return (dispatch, getState, {getFirebase}) => {
        dispatch({type: 'DELETE_BASKET_PENDING'})
        const firestore = getFirebase().firestore()
        return firestore.collection('baskets').doc(id).delete()
            .then((result) => {
                dispatch({type: 'DELETE_BASKET_SUCCESS', result})
            }).catch(error => {
                console.log(error)
                dispatch({type: 'DELETE_BASKET_ERROR', error})
            })
    }
}

export const assignUser = (id, userId) => {
    return (dispatch, getState, {getFirebase}) => {
        dispatch({type: 'ASSIGN_USER_BASKET_PENDING'})
        const firestore = getFirebase().firestore()
        return firestore.collection('baskets').doc(id).update(
            {
                assignedToList: getFirebase().firestore.FieldValue.arrayUnion(userId)
            }
        )
            .then((result) => {
                dispatch({type: 'ASSIGN_USER_BASKET_SUCCESS', result})
            }).catch(error => {
                console.log(error)
                dispatch({type: 'ASSIGN_USER_BASKET_ERROR', error})
            })
    }
}

export const removeUser = (id, userId) => {
    return (dispatch, getState, {getFirebase}) => {
        dispatch({type: 'REMOVE_USER_BASKET_PENDING'})
        const firestore = getFirebase().firestore()
        return firestore.collection('baskets').doc(id).update(
            {
                assignedToList: getFirebase().firestore.FieldValue.arrayRemove(userId)
            }
        )
            .then((result) => {
                dispatch({type: 'REMOVE_USER_BASKET_SUCCESS', result})
            }).catch(error => {
                console.log(error)
                dispatch({type: 'REMOVE_USER_BASKET_ERROR', error})
            })
    }
}
/*
export const assign = (id, userId) => {
    return (dispatch, getState, {getFirebase}) => {
        dispatch({type: 'ASSIGN_BASKET_PENDING'})
        const firestore = getFirebase().firestore()
        return firestore.collection('baskets').doc(id).update(
            {
                assignedToList: firestore.FieldValue.arrayUnion(userId)
            }
            )
            .then((result) => {
                dispatch({type: 'ASSIGN_BASKET_SUCCESS', result})
            }).catch(error => {
                console.log(error)
                dispatch({type: 'ASSIGN_BASKET_ERROR', error})
            })
    }

}*/


