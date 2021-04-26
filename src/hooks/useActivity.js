import React, {useEffect} from 'react';
import {endOfBusinessActivity, startOfBusinessActivity} from "../store/actions/aiaActions";
import {useDispatch} from "react-redux";

const useActivity = ({action, baId}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        switch (action) {
            case 'start':
                dispatch(startOfBusinessActivity(baId))
                return
            case 'end':
                dispatch(endOfBusinessActivity(baId))
                return
        }

    }, [props.action])

    return (
        <div></div>
    );
}

export default useActivity;
