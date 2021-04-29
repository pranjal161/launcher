import './GlobalSearch.scss'

import { DxcDate, DxcInput, DxcSelect } from '@dxc-technology/halstack-react';
import { aia, getValues, search } from "util/functions";

import React from 'react';
import moment from "moment";
import { useTranslation } from 'react-i18next';

const GlobalSearch = (props: { getAvailableOptions: (value: string) => { href: string, options: Array<{ label: string, value: string }> } }) => {

    const { t } = useTranslation();
    const { getAvailableOptions } = props;
    const entityOptions = [
        { label: t('_PERSON'), value: 'person' },
        { label: t('_CONTRACT'), value: 'contract' },
        { label: t('_TICKET'), value: 'ticket' },
    ];
    const [entity, setSelectedEntity] = React.useState('');
    const [isFieldsVisible, setShowFields] = React.useState(false);
    const [propertyOptions, setPropertyOptions] = React.useState([{}]);
    const [property, setSelectedProperty] = React.useState('');
    const [propertyTitle, setSelectedPropertyTitle] = React.useState('');
    const [searchOptions, setSearchOptions] = React.useState([]);
    const [searchedValue, setSearchedValue] = React.useState('');
    const [searchFieldType, setSearchFieldType] = React.useState('');
    const [selectBoxOptions, setSelectBoxOptions] = React.useState([{}]);
    const [searchDateValue, changeDateValue] = React.useState("01-01-1995");
    const [storeData, setStoreData] = React.useState({ options: {}, href: '' });

    const getRequiredData = (selectedVal: string, data: string) => {
        const value: any = getAvailableOptions(selectedVal);
        setStoreData(value);
        return value && value[data];
    }

    const entityChange = (newValue: string) => {
        setSelectedEntity(newValue);
        setSearchedValue('');
        const searchFields: Array<{ label: string, value: string }> = getRequiredData(newValue, 'options');
        setPropertyOptions(searchFields);
    }

    const propertyChange = (newValue: string) => {
        setSelectedProperty(newValue);
        setSearchedValue('');
        const searchFields: any = storeData['options'];
        const fieldType: { format: string, oneOf: Array<{ enum: Array<[]>, title: string }> } = searchFields[newValue];
        if (fieldType && fieldType.oneOf) {
            setSearchFieldType('oneOf');
            populateSelectBoxOptions(fieldType.oneOf);
        } else {
            setSearchFieldType(fieldType && fieldType.format ? fieldType.format : '');
        }
    }

    React.useEffect(() => {
        const selectedTitle = getValues(propertyOptions, 'value', property, 'label');
        setSelectedPropertyTitle(selectedTitle);
    }, [property]);

    const populateSelectBoxOptions = (oneOfValues: Array<{ enum: Array<[]>, title: string }>) => {
        const selectBoxValues = oneOfValues.map((array) => ({ 'label': array.title, 'value': array.enum[0] }));
        setSelectBoxOptions(selectBoxValues);
    }

    const typeSearchParameter = (value: string) => {
        const updatedValue = searchFieldType ? value : value.toUpperCase();
        setSearchedValue(updatedValue);
        if (entity && property && value !== '' && value.length > 3) {
            const url = storeData['href'];
            const searchUrl = search({ 'searchUrl': url, 'name': property, 'value': updatedValue });
            const getResp = Promise.resolve(aia.get(searchUrl));
            getResp.then((response) => {
                if (response && response.data && response.data['_links'] && response.data['_links']['item']) {
                    const items = response.data['_links']['item'];
                    const results = items && items.map((data: { title: string }) => data.title);
                    setSearchOptions(results);
                }
            });
        }
    }

    const onDateChange = (value: any) => {
        changeDateValue(value.stringValue);
    }

    const onDateBlur = (value: any) => {
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
                                padding={{ top: "xxsmall", left: "medium", right: "medium", bottom: "xxsmall" }}
                            ></DxcSelect>
                        </div>
                        <div className="col-3">
                            <DxcSelect
                                options={propertyOptions}
                                onChange={propertyChange}
                                label="Select Field (Property)"
                                margin="medium"
                                padding={{ top: "xxsmall", left: "medium", right: "medium", bottom: "xxsmall" }}
                            ></DxcSelect>
                        </div>
                    </>}
                    <div className="col-6">
                        <div className="w-100" onClick={() => setShowFields(true)}>
                            {!searchFieldType && <DxcInput
                                label={`Search ${propertyTitle ? propertyTitle : ''}`}
                                onChange={typeSearchParameter}
                                autocompleteOptions={searchOptions}
                                margin="medium"
                                value={searchedValue}
                            />}
                            {searchFieldType && searchFieldType === 'oneOf' &&
                                <DxcSelect options={selectBoxOptions}
                                    onChange={typeSearchParameter}
                                    label={`Select ${propertyTitle ? propertyTitle : ''}`}
                                    margin="medium"
                                    padding={{ top: "xxsmall", left: "medium", right: "medium", bottom: "xxsmall" }}
                                />
                            }
                            {searchFieldType && searchFieldType === 'date' &&
                                <DxcDate
                                    label={`Select ${propertyTitle ? propertyTitle : ''}`}
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

