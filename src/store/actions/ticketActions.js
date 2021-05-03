import {getSuggestedActivities} from "./utils/suggestedActivities";
import moment from "moment";

const addHistory = (state, action, values = {}) => {
    const timestamp = Date.now()
    const historyField = 'history.' + timestamp
    const updatedBy = state.auth.id
    const updatedByDisplay = state.firebase.profile.displayName
    const updatedISODate = moment(timestamp).format()
    return {
        [historyField]: {action, ...values, metadata: {updatedBy, updatedByDisplay, updatedISODate, timestamp}}
    }
}

export const create = (ticket) => (dispatch, getState, {getFirebase,}) => {
    dispatch({type: 'CREATE_TICKET_PENDING', ticket})
    const firestore = getFirebase().firestore()
    const createdBy = getState().auth.id
    const createdByDisplay = getState().firebase.profile.displayName
    const suggestedActivities = getSuggestedActivities(ticket)
    const receivedDate = Date.now()
    const deadlineDate = receivedDate

    return firestore.collection('tickets').add({
        deadlineDate,
        receivedDate, ...ticket,
        suggestedActivities,
        createdBy,
        createdByDisplay
    })
        .then((result) => {
            dispatch({type: 'CREATE_TICKET_SUCCESS', result})
        }).catch((error) => {
            console.log(error)
            dispatch({type: 'CREATE_TICKET_ERROR', error})
        })
}

export const update = (ticket) => (dispatch, getState, {getFirebase}) => {
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
    }).catch((error) => {
        console.log(error)
        dispatch({type: 'UPDATE_TICKET_ERROR', error})
    })
}

export const remove = (id) => (dispatch, getState, {getFirebase}) => {
    dispatch({type: 'DELETE_TICKET_PENDING'})
    const firestore = getFirebase().firestore()
    return firestore.collection('tickets').doc(id).delete()
        .then((result) => {
            dispatch({type: 'DELETE_TICKET_SUCCESS', result})
        }).catch((error) => {
            console.log(error)
            dispatch({type: 'DELETE_TICKET_ERROR', error})
        })
}

export const assignTo = (id, userId) => (dispatch, getState, {getFirebase}) => {
    dispatch({type: 'ASSIGN_TICKET_PENDING'})
    const firestore = getFirebase().firestore()
    const history = addHistory(getState(), 'assignedTo', {newValue: userId})
    const assignedToDisplay = userId ? getState().firestore.data.users[userId].displayName : ''

    return firestore.collection('tickets').doc(id).update(
        {
            assignedTo: userId,
            assignedToDisplay,
            ...history
        }
    ).then((result) => {
        dispatch({type: 'ASSIGN_TICKET_SUCCESS', result})
    }).catch((error) => {
        console.log(error)
        dispatch({type: 'ASSIGN_TICKET_ERROR', error})
    })
}

export const createdBy = (id, userId) => (dispatch, getState, {getFirebase}) => {
    dispatch({type: 'CREATED_BY_TICKET_PENDING'})
    const firestore = getFirebase().firestore()
    const createdByDisplay = getState().firestore.data.users[userId].displayName
    const history = addHistory(getState(), 'createdBy', {newValue: userId})
    return firestore.collection('tickets').doc(id).update(
        {
            createdBy: userId,
            createdByDisplay,
            ...history
        }
    ).then((result) => {
        dispatch({type: 'CREATED_BY_TICKET_SUCCESS', result})
    }).catch((error) => {
        console.log(error)
        dispatch({type: 'CREATED_BY_TICKET_ERROR', error})
    })
}

export const select = (id) => (dispatch) => {
    dispatch({type: 'SELECT_TICKET', id})
}

export const unSelect = (id) => (dispatch) => {
    dispatch({type: 'UNSELECT_TICKET', id})
}

export const addRelatedClients = (id, clientId) => (dispatch, getState, {getFirebase}) => {
    const firestore = getFirebase().firestore()
    const history = addHistory(getState(), 'addedRelatedClient', {newValue: clientId})

    return firestore.collection('tickets').doc(id).update(
        {
            relatedClients: getFirebase().firestore.FieldValue.arrayUnion(clientId),
            ...history
        }
    ).then((result) => {
        dispatch({type: 'ADD_RELATED_CLIENT_TICKET_SUCCESS', result})
    }).catch((error) => {
        console.log(error)
        dispatch({type: 'REMOVE_RELATED_CLIENT_TICKET_ERROR', error})
    })
}

export const removeRelatedClients = (id, clientId) => (dispatch, getState, {getFirebase}) => {
    const firestore = getFirebase().firestore()
    const history = addHistory(getState(), 'removedRelatedClient', {newValue: clientId})

    return firestore.collection('tickets').doc(id).update(
        {
            relatedClients: getFirebase().firestore.FieldValue.arrayRemove(clientId),
            ...history
        }
    ).then((result) => {
        dispatch({type: 'REMOVE_RELATED_CLIENT_TICKET_SUCCESS', result})
    }).catch((error) => {
        console.log(error)
        dispatch({type: 'ADD_RELATED_CLIENT_TICKET_ERROR', error})
    })
}

export const addRelatedContract = (id, contract) => (dispatch, getState, {getFirebase}) => {
    const firestore = getFirebase().firestore()
    const history = addHistory(getState(), 'addedRelatedContract', {newValue: contract.title})

    return firestore.collection('tickets').doc(id).update(
        {
            relatedContract: getFirebase().firestore.FieldValue.arrayUnion(contract),
            ...history
        }
    ).then((result) => {
        dispatch({type: 'ADD_RELATED_CONTRACT_TICKET_SUCCESS', result})
    }).catch((error) => {
        console.log(error)
        dispatch({type: 'REMOVE_RELATED_CONTRACT_TICKET_ERROR', error})
    })
}

export const removeRelatedContract = (id, contract) => (dispatch, getState, {getFirebase}) => {
    const firestore = getFirebase().firestore()
    const history = addHistory(getState(), 'removedRelatedClient', {newValue: contract.display})

    return firestore.collection('tickets').doc(id).update(
        {
            relatedContract: getFirebase().firestore.FieldValue.arrayRemove(contract),
            ...history
        }
    ).then((result) => {
        dispatch({type: 'REMOVE_RELATED_CONTRACT_TICKET_SUCCESS', result})
    }).catch((error) => {
        console.log(error)
        dispatch({type: 'ADD_RELATED_CONTRACT_TICKET_ERROR', error})
    })
}


export const removeSuggestedActivity = (id, activityId) => (dispatch, getState, {getFirebase}) => {
    const firestore = getFirebase().firestore()
    const statusField = `suggestedActivities.${activityId}.status`
    return firestore.collection('tickets').doc(id).update(
        {
            [statusField]: 'removed'
        }
    ).then((
        // Nothing to do
    ) => {
        // Nothing to do
    }).catch((error) => {
        console.log(error)
    })
}

export const executeActivity = (id, activityId) => (dispatch, getState, {getFirebase}) => {
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
    }).catch((error) => {
        console.log(error)
    })
}

export const uploadDocument = (id, name, blob, type) => (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase()

    const filesPath = `/tickets/${id}`
    const uploadPromise = firebase.uploadFile(filesPath, blob, filesPath, {name})


    const setDownloadUrl = () => {
        const storageRef = firebase.storage().ref()
        const fileRef = storageRef.child(`${filesPath}/${name}`);

        fileRef.getDownloadURL().then(
            (downloadURL) => {
                addDocument(id, {
                    name,
                    url: downloadURL,
                    receivedDate: Date.now(),
                    type
                })(dispatch, getState, {getFirebase})
            }
        ).catch((error) => {
            console.log('error', error)
        });
    }


    //Workarround because wz have access denied on getting downloadUrl for updload
    uploadPromise.then((uploadResult) => {
        console.log('réussi')
        addDocument(id, {
            name,
            url: uploadResult.downloadURL,
            receivedDate: Date.now(),
            type
        })(dispatch, getState, {getFirebase})
    }).catch((e) => {
        setDownloadUrl()
    })

    return uploadPromise
}

export const addDocument = (id, document) => (dispatch, getState, {getFirebase}) => {
    const firestore = getFirebase().firestore()
    const history = addHistory(getState(), 'addedDocument', {newValue: document})
    const documentId = `documents.${document.receivedDate}`
    return firestore.collection('tickets').doc(id).update(
        {
            [documentId]: document,
            ...history
        }
    ).then((result) => {
        addToDailyUpdates(id, history)(dispatch, getState, {getFirebase})
        dispatch({type: 'ADD_DOCUMENT_TICKET_SUCCESS', result})
    }).catch((error) => {
        console.log(error)
        dispatch({type: 'ADD_DOCUMENT_TICKET_ERROR, error'})
    })
}

export const currentDailyUpdatesId = moment().format("DD-MM-Y");

const addToDailyUpdates = (id, change) => (dispatch, getState, {getFirebase}) => {
    const firestore = getFirebase().firestore()
    const dailyUpdateId = currentDailyUpdatesId

    const dailyUpdatesExist = (getState().firestore.data.dailyUpdates)

    //the format of the nested object is different using set and update !!!
    if (!dailyUpdatesExist)
        //Create the document empty
        firestore.collection('dailyUpdates').doc(dailyUpdateId).set({})

    return firestore.collection('dailyUpdates').doc(dailyUpdateId).update({
        ...change
    }).catch((e) => console.log(e))


}
