export const create = (ticket: any) => (dispatch:any, getState:any, getFirebase: any) => {
    dispatch({type: 'CREATE_BASKET_PENDING', ticket})
    const firestore = getFirebase().firestore()
    console.log('getState()', getState())
    const createdBy = getState().auth.id
    return firestore.collection('baskets').add({assignedToList: [], ...ticket, createdBy })
        .then((result: any) => {
            dispatch({type: 'CREATE_BASKET_SUCCESS', result})
        }).catch((error: any) => {
            console.log(error)
            dispatch({type: 'CREATE_BASKET_ERROR', error})
        })
}

export const update = (ticket:any) => (dispatch : any, getState : any, getFirebase: any) => {
    dispatch({type: 'UPDATE_BASKET_PENDING'})
    const firestore = getFirebase().firestore()
    return firestore.collection('baskets').doc(ticket.id).update(ticket)
        .then((result: any) => {
            dispatch({type: 'UPDATE_BASKET_SUCCESS', result})
        }).catch((error: any) => {
            console.log(error)
            dispatch({type: 'UPDATE_BASKET_ERROR', error})
        })
}

export const remove = (id: any) => (dispatch: any, getState: any, getFirebase : any) => {
    dispatch({type: 'DELETE_BASKET_PENDING'})
    const firestore = getFirebase().firestore()
    return firestore.collection('baskets').doc(id).delete()
        .then((result: any) => {
            dispatch({type: 'DELETE_BASKET_SUCCESS', result})
        }).catch((error: any) => {
            console.log(error)
            dispatch({type: 'DELETE_BASKET_ERROR', error})
        })
}

export const assignUser = (id: any, userId: any) => (dispatch: any, getState: any, getFirebase: any) => {
    dispatch({type: 'ASSIGN_USER_BASKET_PENDING'})
    const firestore = getFirebase().firestore()
    return firestore.collection('baskets').doc(id).update(
        {
            assignedToList: getFirebase().firestore.FieldValue.arrayUnion(userId)
        }
    )
        .then((result: any) => {
            dispatch({type: 'ASSIGN_USER_BASKET_SUCCESS', result})
        }).catch((error:any) => {
            console.log(error)
            dispatch({type: 'ASSIGN_USER_BASKET_ERROR', error})
        })
}

export const removeUser = (id: any, userId: any) => (dispatch:any, getState:any, getFirebase:any) => {
    dispatch({type: 'REMOVE_USER_BASKET_PENDING'})
    const firestore = getFirebase().firestore()
    return firestore.collection('baskets').doc(id).update(
        {
            assignedToList: getFirebase().firestore.FieldValue.arrayRemove(userId)
        }
    )
        .then((result:any) => {
            dispatch({type: 'REMOVE_USER_BASKET_SUCCESS', result})
        }).catch((error:any) => {
            console.log(error)
            dispatch({type: 'REMOVE_USER_BASKET_ERROR', error})
        })
}

/*
export const assign = (id, userId) => {
    return (dispatch, getState, {getFirebase}) => {
        dispatch({type: 'ASSIGN_BASKET_PENDING'})
        const firestore = getFirebase().firestore()
        return firestore.collection('Baskets').doc(id).update(
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


