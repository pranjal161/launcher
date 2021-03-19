export const create = (ticket) => {
    return (dispatch, getState, {getFirebase,}) => {
        dispatch({type: 'CREATE_TICKET_PENDING', ticket})
        const firestore = getFirebase().firestore()
        const creatorId = getState().auth.id
        const creatorDisplay = getState().firebase.profile.firstName + ' ' + getState().firebase.profile.lastName
        return firestore.collection('tickets').add({...ticket, creatorId, creatorDisplay})
            .then((result) => {
                dispatch({type: 'CREATE_TICKET_SUCCESS', result})
            }).catch(error => {
                console.log(error)
                dispatch({type: 'CREATE_TICKET_ERROR', error})
            })
    }
}


export const update = (ticket) => {
    return (dispatch, getState, {getFirebase}) => {
        dispatch({type: 'UPDATE_TICKET_PENDING'})
        const firestore = getFirebase().firestore()
        return firestore.collection('tickets').doc(ticket.id).update(ticket)
            .then((result) => {
                dispatch({type: 'UPDATE_TICKET_SUCCESS', result})
            }).catch(error => {
                console.log(error)
                dispatch({type: 'UPDATE_TICKET_ERROR', error})
            })
    }
}

export const remove = (id) => {
    return (dispatch, getState, {getFirebase}) => {
        dispatch({type: 'DELETE_TICKET_PENDING'})
        const firestore = getFirebase().firestore()
        return firestore.collection('tickets').doc(id).delete()
            .then((result) => {
                dispatch({type: 'DELETE_TICKET_SUCCESS', result})
            }).catch(error => {
                console.log(error)
                dispatch({type: 'DELETE_TICKET_ERROR', error})
            })
    }
}

export const assignTo = (id, userId) => {
    return (dispatch, getState, {getFirebase}) => {
        dispatch({type: 'ASSIGN_TICKET_PENDING'})
        const firestore = getFirebase().firestore()
        return firestore.collection('tickets').doc(id).update(
            {
                assignedTo: userId
            }
        )
            .then((result) => {
                dispatch({type: 'ASSIGN_TICKET_SUCCESS', result})
            }).catch(error => {
                console.log(error)
                dispatch({type: 'ASSIGN_TICKET_ERROR', error})
            })
    }

}

/*
export const assign = (id, userId) => {
    return (dispatch, getState, {getFirebase}) => {
        dispatch({type: 'ASSIGN_TICKET_PENDING'})
        const firestore = getFirebase().firestore()
        return firestore.collection('tickets').doc(id).update(
            {
                assignedToList: firestore.FieldValue.arrayUnion(userId)
            }
            )
            .then((result) => {
                dispatch({type: 'ASSIGN_TICKET_SUCCESS', result})
            }).catch(error => {
                console.log(error)
                dispatch({type: 'ASSIGN_TICKET_ERROR', error})
            })
    }

}*/


