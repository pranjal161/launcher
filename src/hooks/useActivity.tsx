import {useContext, useEffect} from 'react';
import baContext from "context/baContext";
import {fetch} from "../store/actions/aiaActions";
import {useDispatch, useSelector} from "react-redux";
import {array} from "yup";

const useActivity = () => {
    const dispatch = useDispatch()
    const context = useContext(baContext)
    const baId:any = context.baId

    return {
        startActivity: (...param:any) => dispatch({type: 'BA_START', baId}),
        stopActivity: (...param:any) => dispatch({type: 'BA_END', baId}),
    }
}

export default useActivity;
