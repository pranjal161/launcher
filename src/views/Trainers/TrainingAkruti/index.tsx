import React, { useEffect } from 'react';

import GlobalSearch from './components/GlobalSearch/GlobalSearch';
import { aia } from "util/functions";
import useGlobalSearchData from "data/hooks/useGlobalSearchData";
import {useSelector} from "react-redux";

const TrainingAkruti = () => {
    const {loadData} = useGlobalSearchData();
    const searchData = useSelector((state: any) => state.dataFetch.data);

    const getSchema = (selected: string) => searchData && searchData[selected]

    const searchResults = async (url: string) => {
        const getResp = Promise.resolve(aia.get(url));
        const response = await getResp.then((response) => {
            let results;
            if (response && response.data && response.data['_links'] && response.data['_links']['item']) {
                const items = response.data['_links']['item'];
                results = items && items.map((data: { title: string }) => data.title);
            }
            return results;
        });
        return response;
    }
    
    // Load Global Search Data
    useEffect(() => {
        loadData({collection: 'person'});
        loadData({collection: 'contract'});
    }, []);

    return (<>
        <h1>Akruti</h1>
        <GlobalSearch getAvailableOptions={getSchema} getSearchOptions={searchResults} />
    </>);
}

export default TrainingAkruti;