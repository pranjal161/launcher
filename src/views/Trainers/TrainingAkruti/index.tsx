import GlobalSearch from './components/GlobalSearch/GlobalSearch';
import React from "react";
import {useSelector} from "react-redux";

// import useGlobalSearchData from "data/hooks/useGlobalSearchData";


const TrainingAkruti = () => {
    // const {loadData} = useGlobalSearchData();
    const searchData = useSelector((state: any) => state.dataFetch.data);

    const getSchema = (selected: string) => searchData && searchData[selected]
    
    // Load Global Search Data
    // loadData({collection: 'person'});
    // loadData({collection: 'contract'});

    return (<>
        <h1>Akruti</h1>
        <GlobalSearch getAvailableOptions={getSchema} />
    </>);
}

export default TrainingAkruti;