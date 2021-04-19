import GlobalSearch from './components/GlobalSearch/GlobalSearch';
import React from "react";
import { searchInputsArray } from './components/GlobalSearch/constant';
import { getSearchableFields } from "util/functions";

const TrainingAkruti = () => {

    const getSchema = async (schema: string, rel: string) => {
        const schemaFields: Promise<any> = await getSearchableFields(schema, rel);
        return schemaFields;
    }

    return (<>
        <h1>Akruti</h1>
        <GlobalSearch config={searchInputsArray} getAvailableFilter={getSchema} />
    </>);
}

export default TrainingAkruti;