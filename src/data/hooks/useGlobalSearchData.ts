import { config } from './constants';
import { loadData as loadDataAction } from '../../store/actions/globalSearchDataActions';
import {useCallback} from "react";
import {useDispatch} from "react-redux";

const useGlobalSearchData = () => {
    const dispatch = useDispatch();
    
    const loadData = useCallback((params: any) => {
        const { collection } = params;
        const constant: { collection: any, rel: string, schema: string, searchBy: any } = config[collection];
        const updatedParams = {
            ...params,
            rel: constant['rel'],
            schema: constant['schema'],
            search: constant['searchBy']
        };
        dispatch(loadDataAction(updatedParams))
    }, [dispatch]);

    return {loadData};
}

export default useGlobalSearchData;
