import './GlobalSearchMaterial.scss';

import { CircularProgress, Divider, Fade, MenuItem, Paper, Select, TextField } from '@material-ui/core';

import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { propertyNameRefactor } from '../../utils/utils';
import useDebounce from '../../utils/useDebounce';

const GlobalSearchMaterial = ({entitiesList, onSearch, onSelect}) => {
    
    const [entities] = React.useState(entitiesList.map((entity) => {
        console.log(entity.name);
        return entity.name;
    }));
    const [selectedEntity, setSelectedEntity] = React.useState(entities[0]);
    const [properties, setProperties] = React.useState(entitiesList.filter((entity) => selectedEntity === entity.name)[0]?.properties);
    const [selectedProperty, setSelectedProperty] = React.useState(properties[0]);
    
    const [isShown, setIsShown] = React.useState(false);
    const [isSearching, setIsSearching] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const [searchValue, setSearchValue] = React.useState("");
    // const [selectedResult, setSelectedResult] = React.useState("");

    const [resultsList, setResultsList] = React.useState([]);

    const handleEntityChange = (event) => {
        setSelectedEntity(event.target.value);
    }
    const handlePropertyChange = (event) => {
        setSelectedProperty(event.target.value);
    }

    const handleSearch = (event) => {
        setSearchValue(event.target.value);
    }

    const searchData = async (value) => {
        setIsLoading(true);
        setSearchValue(value);

        if (value.length >= 2) {
            setIsSearching(true);
            const reqData = await onSearch(selectedEntity, selectedProperty, searchValue);
            console.log({reqData});
            if (reqData) {
                if (Array.isArray(reqData)) {
                    setResultsList(reqData);
                } else {
                    onSelect(reqData);
                }
                // setResultsList(resultsList.concat(reqData));
                // setResultsList(reqData);
            }
        } else {
            setIsSearching(false);
        }
        setIsLoading(false);
    }

    const hideAdditionalDisplay = () => {
        setIsShown(false);
        setIsSearching(false);
        setSearchValue("");
    }
    
    const handleSelect = (selectedResult) => {
        setSearchValue(selectedResult.summary['contract$number']);
        hideAdditionalDisplay()

        if (selectedResult) {
            onSelect(selectedResult);
        }
    }

    const debounceSearchValue = useDebounce(searchValue, 1000);

    const classes = useStyles();

    React.useEffect(() => {
        console.log({properties});
        console.log({selectedProperty});
    }, [])

    React.useEffect(() => {
        setProperties(entitiesList.filter((entity) => selectedEntity === entity.name)[0]?.properties);
    }, [selectedEntity])

    React.useEffect(() => {
        setSelectedProperty(properties[0]);
    }, [properties])

    React.useEffect(() => {
        if (debounceSearchValue) {
            console.log({debounceSearchValue});
            setIsSearching(true);
            searchData(debounceSearchValue);
        }
    }, [debounceSearchValue])

    React.useEffect(() => {
        if (isSearching === true) {
            setResultsList([]);
        }
    }, [isSearching])

    return (
        <div className={classes.root}>
            {
                isShown &&
                    <Fade in={isShown}>
                        <Paper className={`${classes.container} ${classes.additionalContainer}`}>
                            <div className={classes.additionalFields}>

                                <Select
                                    className={`${classes.select} ${classes.selectEntity}`}
                                    value={selectedEntity}
                                    onChange={handleEntityChange}>
                                    {
                                        entities.map((option, index) => (
                                            
                                            <MenuItem key={index} value={option}>{option}</MenuItem>
                                        ))
                                    }
                                </Select>

                                <Divider className={classes.dividerV} orientation="vertical" />
                                
                                <Select
                                    className={`${classes.select} ${classes.selectProperties}`}
                                    value={selectedProperty || undefined}
                                    disabled={properties?.length === 0}
                                    onChange={handlePropertyChange}>
                                
                                    {
                                        properties?.length > 0 &&
                                            properties?.map((option, index) => (
                                                <MenuItem key={index} value={option}>{propertyNameRefactor(option)}</MenuItem>
                                            ))
                                    }
                                </Select>
                            </div>
                        </Paper>
                    </Fade>
            }

            <Paper className={isShown ?
                isSearching ? `${classes.container} ${classes.mainContainer} ${classes.mainContainerWithoutRightBorderRadius} ${classes.mainContainerWithoutBottomBorderRadius}`
                    : `${classes.container} ${classes.mainContainer} ${classes.mainContainerWithoutRightBorderRadius}`
                : `${classes.container} ${classes.mainContainer}`} component="form">
                
                <TextField
                    onClick={() => setIsShown(true)}
                    className={classes.input}
                    type="search"
                    placeholder={ `Search ${selectedEntity}`}
                    value={searchValue}
                    onChange={handleSearch} />

            </Paper>

            {
                isSearching && 
                    <Paper className={classes.resultsList}>
                        {
                            isLoading && resultsList.length === 0 &&
                                <div className="loading">
                                    <span>Loading ...</span> 
                                    <CircularProgress
                                        color="primary"
                                        size="24px" />
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
                                            <span >{item.summary[`${selectedProperty}`]}</span>
                                        </div>
                                        {
                                            index < resultsList.length &&
                                                <Divider className={classes.dividerH} orientation="horizontal" />
                                        }
                                    </div>
                                ))
                        }
                    </Paper>
            }
        </div>
    );
}

GlobalSearchMaterial.propTypes = {
    entitiesList: PropTypes.array.isRequired,
    propertiesList: PropTypes.array,
    onSearch: PropTypes.func,
    onSelect: PropTypes.func,
}

const useStyles = makeStyles((theme) => ({

    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        boxSizing: "border-box",
        minHeight: 55
    },

    mainContainer: {
        position: 'relative',
        width: 'fit-content',
        height: 55,
        padding: "0 5px"
    },

    additionalContainer: {
        position: 'absolute',
        left: -350,
        borderRadius: '4px 0 0 4px',
        height: 55
    },

    root: {
        position: 'relative',
        maxWidth: 750,
    },

    iconButton: {
        padding: 10
    },

    select: {
        margin: 10
    },

    selectEntity: {
        width: 150
    },
    selectProperties: {
        width: 300
    },

    additionalFields: {
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        width: 350
    },

    dividerV: {
        backgroundColor: "lightgrey",
        margin: '0 5px',
        height: 36
    },

    dividerH: {
        backgroundColor: "lightgrey",
        margin: '5px 0',
        width: "100%"
    },

    dividerLarge: {
        margin: '15px',
        height: '100%',
    },

    input: {
        marginLeft: theme.spacing(1),
        width: 250,
        flex: 1,
    },

    circleProgress: {
        backgroundColor: "#6F2C91"
    },

    mainContainerWithoutRightBorderRadius: {
        borderRadius: '0 4px 4px 0'
    },
    mainContainerWithoutBottomBorderRadius: {
        borderRadius: '0 4px 0 0'
    },

    resultsList: {
        position: "absolute",
        top: 60,
        left: 0,
        width: "100%",
        minHeight: 44,
        maxHeight: 300,
        boxSizing: "border-box",
        overflow: "hidden",
        overflowY: "scroll"
    },
}));

export default GlobalSearchMaterial;