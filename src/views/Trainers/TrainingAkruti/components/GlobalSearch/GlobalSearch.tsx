import './GlobalSearch.scss'

import { DxcDate, DxcInput, DxcSelect } from '@dxc-technology/halstack-react';
import { aia, search, getValues, getSearchableFields } from "util/functions";

import React from 'react';
import moment from "moment";

const GlobalSearch = (props: {config: Array<any>, getAvailableFilter: (schema: string, rel: string) => Promise<any> }) =>  {

    const { config, getAvailableFilter } = props;
    const inputArray = config;
    const [entityOptions, setEntityOptions] = React.useState([{}]);
    const [entity, setSelectedEntity] = React.useState('');
    const [isFieldsVisible, setShowFields] = React.useState(false);
    const [propertyOptions, setPropertyOptions] = React.useState([{}]);
    const [property, setSelectedProperty] = React.useState('');
    const [propertyTitle, setSelectedPropertyTitle] = React.useState('');
    const [searchOptions, setSearchOptions] = React.useState([]);
    const [searchedValue, setSearchedValue] = React.useState('');
    const [searchFieldSchema, setSearchFieldSchema]: Array<any> = React.useState([]);
    const [searchFieldType, setSearchFieldType] = React.useState('');
    const [selectBoxOptions, setSelectBoxOptions] = React.useState([{}]);
    const [searchDateValue, changeDateValue] = React.useState("01-01-1995");
    const [globalFieldData, setGlobalFieldData] = React.useState([{}]);

    const filterEntityArray = (filterBy: string) => {
        const filter: Array<{label: string, value: string}> = inputArray && inputArray.map((array: any) => ({'label': array[filterBy], 'value': array[filterBy]}));
        setEntityOptions(filter);
    }

    React.useEffect(() => {
        filterEntityArray('entity');
    }, [inputArray]);

    const entityChange = async (newValue: string) => {
        setSelectedEntity(newValue);
        setSearchedValue('');
        const searchFields = getValues(globalFieldData, 'fieldsFor', newValue, 'fields');
        if (!searchFields) {
            const selectedArray = getValues(inputArray, 'entity', newValue);
            const schema = selectedArray['schema'];
            const rel = selectedArray['rel'];
            const searchBy = selectedArray['searchBy'];
            const searchFieldSchema = await getAvailableFilter(schema, rel);
            setSearchFieldSchema(searchFieldSchema);
            const convertIntoSelectValues: Array<{label: string, value: string}> = searchBy && searchBy.filter((array: any) => Object.keys(searchFieldSchema).includes(array.value) && array);
            setGlobalFieldData([...globalFieldData, {fieldsFor: newValue, fields: convertIntoSelectValues}]);
        } else {
            setPropertyOptions(searchFields);
        }
    }

    React.useEffect(() => {
        const searchFields = getValues(globalFieldData, 'fieldsFor', entity, 'fields');
        setPropertyOptions(searchFields);
    }, [globalFieldData]);

    const populateSelectBoxOptions = (oneOfValues: Array<{enum: Array<[]>, title: string}>) => {
        const selectBoxValues = oneOfValues.map((array) => ({'label': array.title, 'value': array.enum[0]}));
        setSelectBoxOptions(selectBoxValues);
    }

    const propertyChange = (newValue: string) => {
        setSelectedProperty(newValue);
        // const title: Array<{label: string}> = propertyOptions && propertyOptions.filter((array: { value: string }) => array.value === newValue);
        // setSelectedPropertyTitle(title && title[0].label);
        setSearchedValue('');
        const fieldType: {format: string, oneOf: Array<{enum: Array<[]>, title: string}>} = searchFieldSchema[newValue];
        if (fieldType && fieldType.oneOf) {
            setSearchFieldType('oneOf');
            populateSelectBoxOptions(fieldType.oneOf);
        } else {
            setSearchFieldType(fieldType && fieldType.format ? fieldType.format : '');
        }
    }

    const typeSearchParameter = (value: string) => {
        const updatedValue = searchFieldType ? value : value.toUpperCase();
        setSearchedValue(updatedValue);
        if (entity && property && value !== '' && value.length > 3) {
            const schema = getValues(inputArray, 'entity', entity, 'schema');
            const searchUrl = search({ 'search': schema, 'name': property, 'value': updatedValue });
            const getResp = Promise.resolve(aia.get(searchUrl));
            getResp.then((response) => {
                if (response && response.data && response.data['_links'] && response.data['_links']['item']) {
                    const items = response.data['_links']['item'];
                    const results = items && items.map((data: {title: string}) => {return data.title});
                    setSearchOptions(results);
                }
            });
        }
    }

    const onDateChange = ( value: any ) => {
        changeDateValue(value.stringValue);
    }

    const onDateBlur = ( value: any ) => {
        const formattedDate = moment(value).format("YYYY-MM-DD");
        typeSearchParameter(formattedDate);
    }

    return (
        <>
            <div className="container">
                <div className="row d-flex justify-content-end">
                    {isFieldsVisible && <>
                        <div className="col-3">
                            <DxcSelect
                                options={entityOptions}
                                onChange={entityChange}
                                label="Select Entity"
                                margin="medium"
                                value={entity}
                                padding={{top: "xxsmall", left: "medium", right: "medium", bottom:"xxsmall"}}
                            ></DxcSelect>
                        </div>
                        <div className="col-3">
                            <DxcSelect
                                options={propertyOptions}
                                onChange={propertyChange}
                                label="Select Field (Property)"
                                margin="medium"
                                padding={{top: "xxsmall", left: "medium", right: "medium", bottom:"xxsmall"}}
                            ></DxcSelect>
                        </div>
                    </>}
                    <div className="col-6">
                        <div className="w-100" onClick={() => setShowFields(true)}>
                            {!searchFieldType && <DxcInput
                                label={`Search ${propertyTitle}`}
                                onChange={typeSearchParameter}
                                autocompleteOptions={searchOptions}
                                margin="medium"
                                value={searchedValue}
                            />}
                            {searchFieldType && searchFieldType === 'oneOf' && 
                                <DxcSelect options={selectBoxOptions}
                                    onChange={typeSearchParameter}
                                    label={`Select ${propertyTitle}`}
                                    margin="medium"
                                    padding={{top: "xxsmall", left: "medium", right: "medium", bottom:"xxsmall"}}
                                />
                            }
                            {searchFieldType && searchFieldType === 'date' && 
                                <DxcDate
                                    label={`Select ${propertyTitle}`}
                                    placeholder
                                    value={searchDateValue}
                                    format="yyyy-dd-MM"
                                    margin="medium"
                                    onBlur={(value: any) => onDateBlur(value)}
                                    onChange={(value: any) => onDateChange(value)}
                                    invalid={false}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GlobalSearch

