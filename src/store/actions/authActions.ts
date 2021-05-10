export const signUp = (newUser: any) => (dispatch: any, getState: any, {getFirebase,}: any) => {
    const firebase = getFirebase()
    const firestore = getFirebase().firestore()
    let result: any
    
    firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password)
        .then((resp: { user: { uid: any } }) => {
            result = resp
            
            // Create a user document in firestore with the same id as the user in firebase.auth()
            return firestore.collection('users').doc(resp.user.uid).set({
                ...newUser,
                initials: (newUser.firstName[0] + newUser.lastName[0]).toUpperCase(),
                displayName :newUser.firstName + ' ' + newUser.lastName
            })
        }).then(() => {
            dispatch({type: 'SIGNUP_SUCCESS', result})
        })
        .catch((error: any) => {
            console.log(error)
            dispatch({type: 'SIGNUP_ERROR', error})
        })
}

export const signIn = (credentials: { email: any; password: any }) => (dispatch: any, getState: any, {getFirebase,}: any) => {
    const firebase = getFirebase()
    const {email, password} = credentials
    
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((result: any) => {
                    dispatch({type: 'SIGNED_SUCCESS', result})
                })
                .catch((error: any) => {
                    dispatch({type: 'SIGNED_ERROR', error})
                })
        })
}

export const signOut = (credentials?: any) => (dispatch: any, getState: any, {getFirebase,}: any) => {
    const firebase = getFirebase()

    return firebase.auth().signOut()
        .then(() => {
            dispatch({type: 'SIGNED_OUT'})

            return true
        })
}
