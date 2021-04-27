import baContext from "context/baContext";
import React, {useContext, useEffect} from 'react';
import {endOfBusinessActivity, startOfBusinessActivity} from "../store/actions/aiaActions";
import {fetch} from "../store/actions/aiaActions";
import {useDispatch} from "react-redux";


const useActivity = (action: string, givenBaId?: string) => {
    const dispatch = useDispatch()
    const context = useContext(baContext)
    const baId = givenBaId ? givenBaId : context.baId
    useEffect(() => {
        switch (action) {
            case 'start':
                dispatch(startOfBusinessActivity(baId))
                return
            case 'end':
                dispatch(endOfBusinessActivity(baId))
                return
        }

    }, [action])
    return {fetch: (...param:any) => dispatch(fetch(...param, baId))}
}

export default useActivity;
