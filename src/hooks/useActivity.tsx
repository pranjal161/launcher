import {useContext, useEffect} from 'react';
import baContext from "context/baContext";
import {fetch} from "../store/actions/aiaActions";
import {useDispatch} from "react-redux";


const useActivity = (action?: string, givenBaId?: string) => {
    const dispatch = useDispatch()
    const context = useContext(baContext)
    const baId = givenBaId ? givenBaId : context.baId
    useEffect(() => {
        switch (action) {
            case 'start':
                dispatch({type: 'BA_START', baId})
                return
            case 'end':
                dispatch({type: 'BA_END', baId})
                return
            default:
                return
        }

    }, [action, baId])
    return {fetch: (...param:any) => dispatch(fetch(...param, baId))}
}

export default useActivity;
