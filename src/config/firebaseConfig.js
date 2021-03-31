import 'firebase/firestore'
import 'firebase/auth'

import firebase from 'firebase/app'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyAof2vOMuGCagrWy25VKZ4CMcbqPqdUJZ0",
    authDomain: "react-poc2.firebaseapp.com",
    databaseURL: "https://react-poc2-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "react-poc2",
    storageBucket: "react-poc2.appspot.com",
    messagingSenderId: "724972524745",
    appId: "1:724972524745:web:94ab4bd0af47c1dee2e918",
    measurementId: "G-TSP7PCHG63"
};


firebase.initializeApp(firebaseConfig)
firebase.firestore().settings({timestampsInSnapshots:true})
firebase.analytics();

export default firebase
