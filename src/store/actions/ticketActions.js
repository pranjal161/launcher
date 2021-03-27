import {getSuggestedActivities} from "./utils/suggestedActivities";
import moment from "moment";

const addHistory = (state, action, values = {}) => {
    const timestamp = Date.now()
    const historyField = 'history.' + timestamp
    const updatedBy = state.auth.id
    const updatedByDisplay= state.firebase.profile.displayName
    const updatedISODate = moment(timestamp).format()
    return {
        [historyField]: {action, ...values, metadata: {updatedBy, updatedByDisplay, updatedISODate, timestamp}}
    }

}

export const create = (ticket) => {
    return (dispatch, getState, {getFirebase,}) => {
        dispatch({type: 'CREATE_TICKET_PENDING', ticket})
        const firestore = getFirebase().firestore()
        const creatorId = getState().auth.id
        const creatorDisplay = getState().firebase.profile.firstName + ' ' + getState().firebase.profile.lastName
        const suggestedActivities = getSuggestedActivities(ticket)
        const receivedDate = Date.now()
        const deadlineDate = receivedDate

        return firestore.collection('tickets').add({
            deadlineDate,
            receivedDate, ...ticket,
            suggestedActivities,
            creatorId,
            creatorDisplay
        })
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

export const removeSuggestedActivity = (id, activityId) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore()
        const statusField = `suggestedActivities.${activityId}.status`
        return firestore.collection('tickets').doc(id).update(
            {
                [statusField]: 'removed'
            }
        ).then(() => {
        }).catch(error => {
            console.log(error)
        })
    }
}

export const executeActivity = (id, activityId) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore()
        const statusField = `suggestedActivities.${activityId}.status`
        const executionNumber = `suggestedActivities.${activityId}.executionNumber`
        const history = addHistory(getState(), 'executedActivity', {newValue: activityId})
        return firestore.collection('tickets').doc(id).update(
            {
                [statusField]: 'executed',
                [executionNumber]: getFirebase().firestore.FieldValue.increment(1),
                activities: getFirebase().firestore.FieldValue.arrayUnion({activityId, executionDate: Date.now()}),
                ...history
            }
        ).then(() => {
            window.alert(`Execution of Activity : ${activityId} for ticket ${id}`)
        }).catch(error => {
            console.log(error)
        })
    }
}

export const uploadDocument = (id, name, blob) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()

        const filesPath = `/tickets/${id}`
        const uploadPromise = firebase.uploadFile(filesPath, blob, filesPath, {name})
        console.log('uploadPromise', uploadPromise)
        uploadPromise.then(uploadResult => {
            console.log('ici', uploadResult)
            addDocument(id, {name, url: uploadResult.downloadURL})(dispatch, getState, {getFirebase})
        })

        return uploadPromise
    }
}

export const addDocument = (id, document) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore()
        const history = addHistory(getState(), 'addedDocument', {newValue: document})
        const documentId = `documents.${Date.now()}`
        return firestore.collection('tickets').doc(id).update(
            {
                [documentId]: document,
                ...history
            }
        ).then((result) => {
            console.log('history', history)
            addToDailyUpdates(id, history)(dispatch, getState, {getFirebase})
            dispatch({type: 'ADD_DOCUMENT_TICKET_SUCCESS', result})
        }).catch(error => {
            console.log(error)
            dispatch({type: 'ADD_DOCUMENT_TICKET_ERROR, error'})
        })
    }
}

export const currentDailyUpdatesId = moment().format("DD-MM-Y");

const addToDailyUpdates = (id, change) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore()
        const dailyUpdateId = currentDailyUpdatesId

        const dailyUpdatesExist = (getState().firestore.data.dailyUpdates)

        //the format of the nested object is different using set and update !!!
        if (!dailyUpdatesExist)
            //Create the document empty
            firestore.collection('dailyUpdates').doc(dailyUpdateId).set({})

        return firestore.collection('dailyUpdates').doc(dailyUpdateId).update({
            ...change
        }).catch(e => console.log(e))


    }
}
