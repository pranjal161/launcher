export const createReminder = (reminder: any) => (dispatch:any, getState:any, { getFirebase }: any) => {
    const firestore = getFirebase().firestore();
    const user = getState().auth.id;
    const timestamp = Date.now();
    reminder = { ...reminder, ...{ timestamp: timestamp} }
    const reminderId = `reminders.${timestamp}`
    return firestore.collection('users').doc(user).update(
        {
            [reminderId] : reminder
        }
    ).then((result:any) => {
        dispatch({ type: 'CREATE_USER_REMINDER_SUCCESS', result })
    }).catch((error:any) => {
        dispatch({ type: 'CREATE_USER_REMINDER_ERROR', error })
    })
}

export const updateReminder = (reminder: any) => (dispatch:any, getState:any, { getFirebase }: any) => {
    const firestore = getFirebase().firestore();
    const user = getState().auth.id;
    reminder = { ...reminder, ...{ timestamp: reminder.timestamp } }
    const reminderId = `reminders.${reminder.timestamp}`
    return firestore.collection('users').doc(user).update(
        {
            [reminderId] : reminder
        }
    ).then((result:any) => {
        dispatch({ type: 'UPDATE_USER_REMINDER_SUCCESS', result })
    }).catch((error:any) => {
        dispatch({ type: 'UPDATE_USER_REMINDER_ERROR', error })
    })
}
