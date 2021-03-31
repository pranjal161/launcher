export const signUp = (newUser) => (dispatch, getState, {getFirebase,}) => {
    const firebase = getFirebase()
    const firestore = getFirebase().firestore()
    let result
    
    firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password)
        .then((resp) => {
            result = resp
            
            // Create a user document in firestore with the same id as the user in firebase.auth()
            return firestore.collection('users').doc(resp.user.uid).set({
                ...newUser,
                initials: (newUser.firstName[0] + newUser.lastName[0]).toUpperCase()
            })
        }).then(() => {
            dispatch({type: 'SIGNUP_SUCCESS', result})
        })
        .catch((error) => {
            console.log(error)
            dispatch({type: 'SIGNUP_ERROR', error})
        })
}

export const signIn = (credentials) => (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase()
    const {email, password} = credentials
    
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((result) => {
                    dispatch({type: 'SIGNED_SUCCESS', result})
                })
                .catch((error) => {
                    dispatch({type: 'SIGNED_ERROR', error})
                })
        })
}

export const signOut = () => (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase()

    return firebase.auth().signOut()
        .then(() => {
            dispatch({type: 'SIGNED_OUT'})

            return true
        })
}
