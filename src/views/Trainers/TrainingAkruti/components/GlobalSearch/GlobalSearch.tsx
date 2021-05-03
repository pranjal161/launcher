import './GlobalSearch.scss'

import { DxcDate, DxcInput, DxcSelect } from '@dxc-technology/halstack-react';
import { getValues, search } from "util/functions";

import React from 'react';
import moment from "moment";
import { useTranslation } from 'react-i18next';

const GlobalSearch = (props: { getAvailableOptions: (value: string) => { href: string, options: Array<{ label: string, value: string }> }, getSearchOptions: (url: string) => Promise<any> }) => {

    const { t } = useTranslation();
    const { getAvailableOptions, getSearchOptions } = props;
    const entityOptions = [
        { label: t('_PERSON'), value: 'person' },
        { label: t('_CONTRACT'), value: 'contract' },
        { label: t('_TICKET'), value: 'ticket' },
    ];
    const [isFieldsVisible, setShowFields] = React.useState(false);
    const [searchFieldType, setSearchFieldType] = React.useState('');
    const [searchDateValue, changeDateValue] = React.useState("01-01-1995");
    const [storeData, setStoreData] = React.useState({ options: {}, href: '' });
    const [selected, setSelected] = React.useState({ entity: '', property: '', propertyTitle: '', searched: '' });
    const [boxOptions, setOptions] = React.useState({entity: entityOptions, property: [{}], selectOptions: [], resultOptions: []});

    // Function to retrieve data from parent component - Redux store
    const getRequiredData = (selectedVal: string, data: string) => {
        const value: any = getAvailableOptions(selectedVal);
        setStoreData(value);
        return value && value[data];
    }

    // Function trigerred on change selection of Entity 
    const entityChange = (newValue: string) => {
        setSelected({...selected, entity: newValue, searched: ''});
        const searchFields: Array<{ label: string, value: string }> = getRequiredData(newValue, 'options');
        setOptions({...boxOptions, property: searchFields});
    }

    // Function trigerred on change selection of Property 
    const propertyChange = (newValue: string) => {
        setSelected({...selected, property: newValue, searched: ''});
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
        const selectedTitle = getValues(boxOptions['property'], 'value', selected['property'], 'label');
        setSelected({...selected, propertyTitle: selectedTitle});
    }, [selected['property']]);

    // Populate the Data in Final Select Search Box
    const populateSelectBoxOptions = (oneOfValues: Array<{ enum: Array<[]>, title: string }>) => {
        const selectBoxValues: any = oneOfValues.map((array) => ({ 'label': array.title, 'value': array.enum[0] }));
        setOptions({...boxOptions, selectOptions: selectBoxValues});
    }

    // Function trigerred on typing letters to search
    const typeSearchParameter = async (value: string) => {
        const updatedValue = searchFieldType ? value : value.toUpperCase();
        setSelected({...selected, searched: updatedValue});
        if (selected['entity'] && selected['property'] && value !== '' && value.length > 3) {
            const url = storeData['href'];
            const searchUrl = search({ 'searchUrl': url, 'name': selected['property'], 'value': updatedValue });
            const results = await getSearchOptions(searchUrl);
            setOptions({...boxOptions, resultOptions: results});
        }
    }

    // Trigerred on Data change
    const onDateChange = (value: any) => {
        changeDateValue(value.stringValue);
    }

    // Function trigerred on blur of date field
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
                                value={selected['entity']}
                                padding={{ top: "xxsmall", left: "medium", right: "medium", bottom: "xxsmall" }}
                            ></DxcSelect>
                        </div>
                        <div className="col-3">
                            <DxcSelect
                                options={boxOptions['property']}
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
                                label={`Search ${selected['propertyTitle'] ? selected['propertyTitle'] : ''}`}
                                onChange={typeSearchParameter}
                                autocompleteOptions={boxOptions['resultOptions']}
                                margin="medium"
                                value={selected['searched']}
                            />}
                            {searchFieldType && searchFieldType === 'oneOf' &&
                                <DxcSelect options={boxOptions['selectOptions']}
                                    onChange={typeSearchParameter}
                                    label={`Select ${selected['propertyTitle'] ? selected['propertyTitle'] : ''}`}
                                    margin="medium"
                                    padding={{ top: "xxsmall", left: "medium", right: "medium", bottom: "xxsmall" }}
                                />
                            }
                            {searchFieldType && searchFieldType === 'date' &&
                                <DxcDate
                                    label={`Select ${selected['propertyTitle'] ? selected['propertyTitle'] : ''}`}
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

