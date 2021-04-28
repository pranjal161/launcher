import {useContext, useEffect} from 'react';
import baContext from "context/baContext";
import {fetch} from "../store/actions/aiaActions";
import {useDispatch, useSelector} from "react-redux";


const useActivityApi = ( hRef?: string ) => {
    const dispatch = useDispatch()
    const context = useContext(baContext)
    const baId: any = context.baId

    const fetchLocal = (hRef:string|undefined, actionType:any) => {
        dispatch(fetch(hRef, actionType, baId))
    }

    useEffect(() => fetchLocal(hRef, 'get'), [hRef])

    const useSelectResponse = useSelector((state: any) => {
        return baId && hRef && state.aia.ba && state.aia.ba[baId] && state.aia.ba[baId][hRef]
    })

    return {response: useSelectResponse}
}

export default useActivityApi;
