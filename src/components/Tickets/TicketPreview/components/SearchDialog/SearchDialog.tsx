import GlobalSearch from 'views/Trainers/TrainingAkruti/components/GlobalSearch/GlobalSearch';
import React from 'react';
import SearchTable from './SearchTable';
import { aia } from "util/functions";
import {useSelector} from "react-redux";

const SearchDialog = (props: { selectedEntity: string, getSelectedData: (data: any) => void, dataList: {} }) => {
    const { selectedEntity, getSelectedData, dataList } = props;
    const [searchData, setSearchedData] = React.useState([]);
    const searchOptions = useSelector((state: any) => state.dataFetch.data);

    const getSchema = (selected: string) => searchOptions && searchOptions[selected]

    const searchResults = async (url: string) => {
        const getResp = Promise.resolve(aia.get(url));
        const response = await getResp.then((response) => {
            let results = [];
            if (response && response.data && response.data['_links'] && response.data['_links']['item']) {
                results = response.data['_links']['item'];
            }
            return results;
        });
        setSearchedData(response);
    }

    return (<>
        <GlobalSearch selectedEntity={selectedEntity} getAvailableOptions={getSchema} getSearchOptions={searchResults} />
        <SearchTable tableData={searchData} tableStats={dataList} setSelectedData={getSelectedData} />
    </>);
};

export default SearchDialog;