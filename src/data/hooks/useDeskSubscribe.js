import {useCallback} from "react";
import useDeskAuth from "./useDeskAuth";
import {useFirestoreConnect} from "react-redux-firebase";
import {useSelector} from "react-redux";

/** Subscribe to query on Firestore and connect it to the store
 *  To be use carefully !!!!!!!!!!!!!!!
 *  Once per query per application session.
 * @param params : { collection: 'tickets', storeAs, limit, where : [field, operation, value]}
 */

const useDeskSubscribe = ({collection, ...rest}) => {
    const {storeAs = collection} = rest
    const listenerExist = useSelector((state) => state.firestore.listeners.byId[storeAs])
    const {auth} = useDeskAuth()
    const logged = auth.logged

    //Do it once only
    const connectQuery = useCallback(() => {
        if (logged && !listenerExist)
            return [
                {
                    collection: collection,
                    storeAs,
                    ...rest
                }]
        else
            return [{
                collection: 'not-exist',
                limit: 1
            }]
        //Norbert : Ne pas retirer,
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logged, storeAs])

    if (logged && !listenerExist)
        console.log('Firestore Subscription to ' + collection, logged, connectQuery())

    useFirestoreConnect(connectQuery)
}

export default useDeskSubscribe
