export const createReminder = (reminder) => (dispatch, getState, { getFirebase, }) => {
    const firestore = getFirebase().firestore();
    const user = getState().auth.id;
    const timestamp = Date.now();
    reminder = { ...reminder, ...{ time: timestamp} }
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
