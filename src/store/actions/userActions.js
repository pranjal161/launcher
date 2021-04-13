export const createReminder = (reminder) => (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const user = getState().auth.id;
    const timestamp = Date.now();
    reminder = { ...reminder, ...{ timestamp: timestamp} }
    const reminderId = `reminders.${timestamp}`
    return firestore.collection('users').doc(user).update(
        {
            [reminderId] : reminder
        }
    ).then((result) => {
        dispatch({ type: 'CREATE_USER_REMINDER_SUCCESS', result })
    }).catch((error) => {
        dispatch({ type: 'CREATE_USER_REMINDER_ERROR', error })
    })
}

export const updateReminder = (reminder) => (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const user = getState().auth.id;
    reminder = { ...reminder, ...{ timestamp: reminder.timestamp } }
    const reminderId = `reminders.${reminder.timestamp}`
    return firestore.collection('users').doc(user).update(
        {
            [reminderId] : reminder
        }
    ).then((result) => {
        dispatch({ type: 'UPDATE_USER_REMINDER_SUCCESS', result })
    }).catch((error) => {
        dispatch({ type: 'UPDATE_USER_REMINDER_ERROR', error })
    })
}
