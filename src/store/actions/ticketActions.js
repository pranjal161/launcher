import {getSuggestedActivities} from "./utils/suggestedActivities";

const addHistory = (state, action, metadata = {}) => {
    const historyField = 'history.' + Date.now()
    const updatedBy = state.auth.id
    return {
        [historyField]: {action, metadata: {...metadata, updatedBy}}
    }

}

export const create = (ticket) => {
    return (dispatch, getState, {getFirebase,}) => {
        dispatch({type: 'CREATE_TICKET_PENDING', ticket})
        const firestore = getFirebase().firestore()
        const creatorId = getState().auth.id
        const creatorDisplay = getState().firebase.profile.firstName + ' ' + getState().firebase.profile.lastName

        const receivedDate = Date.now()
        const deadlineDate = receivedDate

        return firestore.collection('tickets').add({deadlineDate, receivedDate, ...ticket, creatorId, creatorDisplay})
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
        const history = addHistory(getState(), 'ticketUpdated')
        const suggestedActivities = getSuggestedActivities(ticket)

        return firestore.collection('tickets').doc(ticket.id).update({
            ...ticket,
            ...history,
            suggestedActivities
        }).then((result) => {
            dispatch({type: 'UPDATE_TICKET_SUCCESS', result})
            addHistory(ticket.id)
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
        const history = addHistory(getState(), 'assignedTo', {newValue: userId})

        return firestore.collection('tickets').doc(id).update(
            {
                assignedTo: userId,
                ...history
            }
        ).then((result) => {
            dispatch({type: 'ASSIGN_TICKET_SUCCESS', result})
        }).catch(error => {
            console.log(error)
            dispatch({type: 'ASSIGN_TICKET_ERROR', error})
        })
    }
}

export const createdBy = (id, userId) => {
    return (dispatch, getState, {getFirebase}) => {
        dispatch({type: 'CREATED_BY_TICKET_PENDING'})
        const firestore = getFirebase().firestore()

        const history = addHistory(getState(), 'createdBy', {newValue: userId})
        return firestore.collection('tickets').doc(id).update(
            {
                createdBy: userId,
                ...history
            }
        ).then((result) => {
            dispatch({type: 'CREATED_BY_TICKET_SUCCESS', result})
        }).catch(error => {
            console.log(error)
            dispatch({type: 'CREATED_BY_TICKET_ERROR', error})
        })
    }
}

export const select = (id) => {
    return (dispatch) => {
        dispatch({type: 'SELECT_TICKET', id})
    }
}

export const unSelect = (id) => {
    return (dispatch) => {
        dispatch({type: 'UNSELECT_TICKET', id})
    }
}

export const addRelatedClients = (id, clientId) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore()
        const history = addHistory(getState(), 'addedRelatedClient', {newValue: clientId})

        return firestore.collection('tickets').doc(id).update(
            {
                relatedClients: getFirebase().firestore.FieldValue.arrayUnion(clientId),
                ...history
            }
        ).then((result) => {
            dispatch({type: 'ADD_RELATED_CLIENT_TICKET_SUCCESS', result})
        }).catch(error => {
            console.log(error)
            dispatch({type: 'REMOVE_RELATED_CLIENT_TICKET_ERROR', error})
        })
    }
}

export const removeRelatedClients = (id, clientId) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore()
        const history = addHistory(getState(), 'removedRelatedClient', {newValue: clientId})

        return firestore.collection('tickets').doc(id).update(
            {
                relatedClients: getFirebase().firestore.FieldValue.arrayRemove(clientId),
                ...history
            }
        ).then((result) => {
            dispatch({type: 'REMOVE_RELATED_CLIENT_TICKET_SUCCESS', result})
        }).catch(error => {
            console.log(error)
            dispatch({type: 'ADD_RELATED_CLIENT_TICKET_ERROR', error})
        })
    }
}


