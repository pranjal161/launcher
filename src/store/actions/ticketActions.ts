import {getSuggestedActivities} from "./utils/suggestedActivities";
import moment from "moment";

const addHistory = (state: any, action: any, values = {}) => {
    const timestamp = Date.now()
    const historyField = 'history.' + timestamp
    const updatedBy = state.auth.id
    const updatedByDisplay = state.firebase.profile.displayName
    const updatedISODate = moment(timestamp).format()
    return {
        [historyField]: {action, ...values, metadata: {updatedBy, updatedByDisplay, updatedISODate, timestamp}}
    }
}

export const create = (ticket: any) => (dispatch: any, getState: any, {getFirebase}: any) => {
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
        .then((result: any) => {
            dispatch({type: 'CREATE_TICKET_SUCCESS', result})
        }).catch((error: any) => {
            console.log(error)
            dispatch({type: 'CREATE_TICKET_ERROR', error})
        })
}

export const update = (ticket: any) => (dispatch: any, getState: any, {getFirebase}: any) => {
    dispatch({type: 'UPDATE_TICKET_PENDING'})
    const firestore = getFirebase().firestore()
    const history = addHistory(getState(), 'ticketUpdated')
    const suggestedActivities = getSuggestedActivities(ticket)

    return firestore.collection('tickets').doc(ticket.id).update({
        ...ticket,
        ...history,
        suggestedActivities
    }).then((result: any) => {
        dispatch({type: 'UPDATE_TICKET_SUCCESS', result})
    }).catch((error: any) => {
        console.log(error)
        dispatch({type: 'UPDATE_TICKET_ERROR', error})
    })
}

export const remove = (id: any) => (dispatch: any, getState: any, {getFirebase}: any) => {
    dispatch({type: 'DELETE_TICKET_PENDING'})
    const firestore = getFirebase().firestore()
    return firestore.collection('tickets').doc(id).delete()
        .then((result: any) => {
            dispatch({type: 'DELETE_TICKET_SUCCESS', result})
        }).catch((error: any) => {
            console.log(error)
            dispatch({type: 'DELETE_TICKET_ERROR', error})
        })
}

export const assignTo = (id: any, userId:any) => (dispatch: any, getState: any, {getFirebase}: any) => {
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
    ).then((result: any) => {
        dispatch({type: 'ASSIGN_TICKET_SUCCESS', result})
    }).catch((error: any) => {
        console.log(error)
        dispatch({type: 'ASSIGN_TICKET_ERROR', error})
    })
}

export const createdBy = (id: any, userId: any) => (dispatch: any, getState: any, {getFirebase}: any) => {
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
    ).then((result: any) => {
        dispatch({type: 'CREATED_BY_TICKET_SUCCESS', result})
    }).catch((error: any) => {
        console.log(error)
        dispatch({type: 'CREATED_BY_TICKET_ERROR', error})
    })
}

export const select = (id: any) => (dispatch: any) => {
    dispatch({type: 'SELECT_TICKET', id})
}

export const unSelect = (id: any) => (dispatch: any) => {
    dispatch({type: 'UNSELECT_TICKET', id})
}

export const addRelatedClients = (id: any, clientId: any) => (dispatch: any, getState: any, {getFirebase}: any) => {
    const firestore = getFirebase().firestore()
    const history = addHistory(getState(), 'addedRelatedClient', {newValue: clientId})

    return firestore.collection('tickets').doc(id).update(
        {
            relatedClients: getFirebase().firestore.FieldValue.arrayUnion(clientId),
            ...history
        }
    ).then((result: any) => {
        dispatch({type: 'ADD_RELATED_CLIENT_TICKET_SUCCESS', result})
    }).catch((error: any) => {
        console.log(error)
        dispatch({type: 'REMOVE_RELATED_CLIENT_TICKET_ERROR', error})
    })
}

export const removeRelatedClients = (id: any, clientId: any) => (dispatch: any, getState: any, {getFirebase}: any) => {
    const firestore = getFirebase().firestore()
    const history = addHistory(getState(), 'removedRelatedClient', {newValue: clientId})

    return firestore.collection('tickets').doc(id).update(
        {
            relatedClients: getFirebase().firestore.FieldValue.arrayRemove(clientId),
            ...history
        }
    ).then((result: any) => {
        dispatch({type: 'REMOVE_RELATED_CLIENT_TICKET_SUCCESS', result})
    }).catch((error: any) => {
        console.log(error)
        dispatch({type: 'ADD_RELATED_CLIENT_TICKET_ERROR', error})
    })
}

export const addRelatedContract = (id: any, contract: { title: any; }) => (dispatch: any, getState: any, {getFirebase}: any) => {
    const firestore = getFirebase().firestore()
    const history = addHistory(getState(), 'addedRelatedContract', {newValue: contract.title})

    return firestore.collection('tickets').doc(id).update(
        {
            relatedContract: getFirebase().firestore.FieldValue.arrayUnion(contract),
            ...history
        }
    ).then((result: any) => {
        dispatch({type: 'ADD_RELATED_CONTRACT_TICKET_SUCCESS', result})
    }).catch((error: any) => {
        console.log(error)
        dispatch({type: 'REMOVE_RELATED_CONTRACT_TICKET_ERROR', error})
    })
}

export const removeRelatedContract = (id: any, contract: { display: any; }) => (dispatch: any, getState: any, {getFirebase}: any) => {
    const firestore = getFirebase().firestore()
    const history = addHistory(getState(), 'removedRelatedClient', {newValue: contract.display})

    return firestore.collection('tickets').doc(id).update(
        {
            relatedContract: getFirebase().firestore.FieldValue.arrayRemove(contract),
            ...history
        }
    ).then((result: any) => {
        dispatch({type: 'REMOVE_RELATED_CONTRACT_TICKET_SUCCESS', result})
    }).catch((error: any) => {
        console.log(error)
        dispatch({type: 'ADD_RELATED_CONTRACT_TICKET_ERROR', error})
    })
}


export const removeSuggestedActivity = (id: any, activityId: any) => (dispatch: any, getState: any, {getFirebase}: any) => {
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
    }).catch((error: any) => {
        console.log(error)
    })
}

export const executeActivity = (id: any, activityId: any) => (dispatch: any, getState: any, {getFirebase}: any) => {
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
    }).catch((error: any) => {
        console.log(error)
    })
}

export const uploadDocument = (id: any, name: any, blob: any, type: any) => (dispatch: any, getState: any, {getFirebase}: any) => {
    const firebase = getFirebase()

    const filesPath = `/tickets/${id}`
    const uploadPromise = firebase.uploadFile(filesPath, blob, filesPath, {name})


    const setDownloadUrl = () => {
        const storageRef = firebase.storage().ref()
        const fileRef = storageRef.child(`${filesPath}/${name}`);

        fileRef.getDownloadURL().then(
            (downloadURL: any) => {
                addDocument(id, {
                    name,
                    url: downloadURL,
                    receivedDate: Date.now(),
                    type
                })(dispatch, getState, {getFirebase})
            }
        ).catch((error: any) => {
            console.log('error', error)
        });
    }


    //Workarround because wz have access denied on getting downloadUrl for updload
    uploadPromise.then((uploadResult: { downloadURL: any; }) => {
        console.log('réussi')
        addDocument(id, {
            name,
            url: uploadResult.downloadURL,
            receivedDate: Date.now(),
            type
        })(dispatch, getState, {getFirebase})
    }).catch((e: any) => {
        setDownloadUrl()
    })

    return uploadPromise
}

export const addDocument = (id: any, document: { name?: any; url?: any; receivedDate: any; type?: any; }) => (dispatch: any, getState: any, {getFirebase}: any) => {
    const firestore = getFirebase().firestore()
    const history = addHistory(getState(), 'addedDocument', {newValue: document})
    const documentId = `documents.${document.receivedDate}`
    return firestore.collection('tickets').doc(id).update(
        {
            [documentId]: document,
            ...history
        }
    ).then((result: any) => {
        addToDailyUpdates(id, history)(dispatch, getState, {getFirebase})
        dispatch({type: 'ADD_DOCUMENT_TICKET_SUCCESS', result})
    }).catch((error: any) => {
        console.log(error)
        dispatch({type: 'ADD_DOCUMENT_TICKET_ERROR, error'})
    })
}

export const currentDailyUpdatesId = moment().format("DD-MM-Y");

const addToDailyUpdates = (id: any, change: { [x: string]: { metadata: { updatedBy: any; updatedByDisplay: any; updatedISODate: string; timestamp: number; }; action: any; }; }) => (dispatch: any, getState: any, {getFirebase}: any) => {
    const firestore = getFirebase().firestore()
    const dailyUpdateId = currentDailyUpdatesId

    const dailyUpdatesExist = (getState().firestore.data.dailyUpdates)

    //the format of the nested object is different using set and update !!!
    if (!dailyUpdatesExist)
        //Create the document empty
        firestore.collection('dailyUpdates').doc(dailyUpdateId).set({})

    return firestore.collection('dailyUpdates').doc(dailyUpdateId).update({
        ...change
    }).catch((e: any) => console.log(e))


}
