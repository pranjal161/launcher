import './GlobalSearchDXC.css';

import { DxcBox, DxcInput, DxcSelect, DxcSpinner } from '@dxc-technology/halstack-react';

import PropTypes from 'prop-types';
import React from 'react';
import { formatPropertiesArray } from '../../utils/utils';
import useDebounce from '../../utils/useDebounce';

const GlobalSearchDXC = ({entitiesList, onSearch, onSelect}) => {
    
    const [entities] = React.useState(entitiesList);
    const [selectedEntity, setSelectedEntity] = React.useState(entities[0]);
    const [properties, setProperties] = React.useState(formatPropertiesArray(selectedEntity.properties));
    const [selectedProperty, setSelectedProperty] = React.useState(properties[0]);
    
    const [isShown, setIsShown] = React.useState(false);
    const [isSearching, setIsSearching] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const [searchValue, setSearchValue] = React.useState("");

    const [resultsList, setResultsList] = React.useState([]);

    const handleEntityChange = (newValue) => {
        console.log("Entity : ", newValue);
        setSelectedEntity(entities[newValue - 1]);
    }

    const handlePropertyChange = (newValue) => {
        console.log("Property : ", newValue);
        setSelectedProperty(properties[newValue - 1]);
    }

    const handleSearch = (newValue) => {
        setSearchValue(newValue);
    }

    const searchData = async (value) => {
        setResultsList([]);
        setIsLoading(true);
        setSearchValue(value);

        if (value.length >= 2) {
            setIsSearching(true);
            const reqData = await onSearch(selectedEntity.label, selectedProperty.name, searchValue);
            console.log({reqData});
            if (reqData) {
                if (Array.isArray(reqData)) {
                    setResultsList(reqData);
                } else {
                    onSelect(reqData);
                }
            }
        } else {
            setIsSearching(false);
        }
        setIsLoading(false);
    }

    const handleSelect = (selectedResult) => {
        setSearchValue(selectedResult.summary[`${selectedProperty.name}`]);
        setIsShown(false);

        if (selectedResult) {
            onSelect(selectedResult);
        }
    }

    const debounceSearchValue = useDebounce(searchValue, 1000);

    React.useEffect(() => {
        setProperties(formatPropertiesArray(selectedEntity.properties));
    }, [selectedEntity])

    React.useEffect(() => {
        if (selectedEntity.properties.length > 0) {
            setSelectedProperty(properties[0]);
        } else {
            setSelectedProperty({})
        }
    }, [properties])

    React.useEffect(() => {
        console.log({selectedProperty});
    }, [selectedProperty])

    React.useEffect(() => {
        if (debounceSearchValue) {
            setIsSearching(true);
            searchData(debounceSearchValue);
        }
    }, [debounceSearchValue])

    return (
        <div className="root">
            {
                isShown &&
                        <div className="filters">
                            <DxcBox
                                padding="xxsmall"
                                size="fillParent">
                                <div className="entity">
                                    <DxcSelect
                                        options={entities}
                                        onChange={handleEntityChange}
                                        size="fillParent"
                                        value={selectedEntity.value} />
                                </div>

                                <div className="property">
                                    <DxcSelect
                                        options={properties}
                                        onChange={handlePropertyChange}
                                        size="fillParent"
                                        disabled={selectedEntity.properties.length === 0}
                                        value={selectedProperty?.value} />
                                </div>
                            </DxcBox>
                        </div>
            }

            <div className="main" onClick={() => setIsShown(true)}>
                <DxcBox
                    padding="xxsmall"
                    size="fillParent">
                    <DxcInput
                        onChange={handleSearch}
                        size="fillParent"
                        placeholder={`Search ${selectedEntity.label}`}
                        value={searchValue}/>
                </DxcBox>
            </div>

            {
                isSearching && 
                    <div className="resultsList">
                        <DxcBox
                            padding="xxsmall"
                            size="medium">
                            <div>
                                {
                                    isLoading && resultsList.length === 0 &&
                                        <div className="loading">
                                            <span>Loading ...</span> 
                                            <DxcSpinner mode="small" />
                                        </div>
                                }

                                {
                                    !isLoading && resultsList.length === 0 &&
                                        <span>No suggestions ...</span>
                                }
                                
                                {
                                    resultsList.length > 1 && 
                                        resultsList.map((item, index) => (
                                            <div key={index}>
                                                <div className={resultsList.length > 1 ? "resultLine" : "resultLine resultLineSolo"} onClick={() => handleSelect({...item})}>
                                                    <span >{item.summary[`${selectedProperty.name}`]}</span>
                                                </div>
                                                {
                                                    index < resultsList.length &&
                                                        <div className="dividerH"></div>
                                                }
                                            </div>
                                        ))
                                }
                            </div>
                        </DxcBox>
                    </div>
            }
        </div>
    );
}

GlobalSearchDXC.propTypes = {
    entitiesList: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
}

export default GlobalSearchDXC;