import './styles.scss';

import { DxcInput, DxcTabs } from '@dxc-technology/halstack-react';
import { componentsTabs, mainTabs } from './models/tabs';

import Dialog from './components/Dialog/Dialog';
import GlobalSearchMaterial from './components/GlobalSearchMaterial/GlobalSearchMaterial';
import React from "react";
import axios from 'axios';
import {entities} from './models/data.js';

interface Test {
    onChange?: (value: any) => null
}

const TrainingQuentin = () => {
    
    const [mainActiveTab, setMainActiveTab] = React.useState(0);
    const [secondaryActiveTab, setSecondaryActiveTab] = React.useState(1);
    const [selectedValue, setSelectedValue] = React.useState({});
    const [searchValue, setSearchValue] = React.useState('');
    const [resultList, setResultList] = React.useState<any>(["un", "deux", "trois"]);

    const [val, setVal] = React.useState('');
    const [isOpen, setIsOpen] = React.useState(false);

    const onMainTabClick = (i: number) => {
        setMainActiveTab(i);
    };
    const onSecondaryTabClick = (i: number) => {
        setSecondaryActiveTab(i);
    };

    const handleDialogApply = (newValue: any) => {
        setVal(newValue);
        setIsOpen(false);
    }

    const handleDialogCancel = () => {
        setIsOpen(false);
    }

    const getData = async (entity: string, property: string, searchValue: string) => {
        const entityGroup = `${entity.toLowerCase()}s`;
        if (entity === "Person") {
            property = property.replace('$', '%3A');
        }
        const res = await axios.get(`insurance/${entityGroup}?${property}=${searchValue}*`, {});

        if (res.data._links.item) {
            return res.data._link.item;
        }
    }

    const handleSelect = (value: Object) => {
        console.log({value});
        setSelectedValue(value);
    }
    React.useEffect(() => {
        if (mainActiveTab === 0 && secondaryActiveTab === 2) {
            
        }
    }, [mainActiveTab, secondaryActiveTab])

    const handleSearchChange = (newValue: string):void => {
        setSearchValue(newValue);

        setTimeout(() => {
            setResultList([
                {
                    summary: {
                        "person$calculated_entry_date": "9999-99-99",
                        "person$first_name": "Marie",
                        "person$first_name_normalized": "MARIE",
                        "person$display_id": "Mme Marie DESRUE - 273396 -  né(e) le 06/06/1974 - 75008",
                        "person$client_category": null,
                        "person$display_id1": "Mme Marie DESRUE",
                        "person$age": 46,
                        "person$client_number": "273396",
                        "person$middle_name": null,
                        "person$unique_identifier": "273396",
                        "person$birth_date": "1974-06-06",
                        "person$last_name": "DESRUE",
                        "person$person_title": "mrs"
                    },
                    name: "Mme Marie DESRUE - 273396 -  né(e) le 06/06/1974 - 75008",
                    href: "https://diaas-dev.gtaia-test-domain.net/std-dev-lux-13100/insurance/persons/ID-wJsQC78iZ",
                    title: "Mme Marie DESRUE - 273396 -  né(e) le 06/06/1974 - 75008"
                },
                {
                    summary:{
                        "person$calculated_entry_date": "2007-01-01",
                        "person$first_name": "Enfant",
                        "person$first_name_normalized": "ENFANT",
                        "person$display_id": "Mlle Enfant CAS02-TNR-LIMITES_348 - 276773 -  né(e) le 01/05/1990 - CP inconnu",
                        "person$client_category": null,
                        "person$display_id1": "Mlle Enfant CAS02-TNR-LIMITES_348",
                        "person$age": 30,
                        "person$client_number": "276773",
                        "person$middle_name": "",
                        "person$unique_identifier": "276773",
                        "person$birth_date": "1990-05-01",
                        "person$last_name": "CAS02-TNR-LIMITES_348",
                        "person$person_title": "miss"
                    },
                    name: "Mlle Enfant CAS02-TNR-LIMITES_348 - 276773 -  né(e) le 01/05/1990 - CP inconnu",
                    href: "https://diaas-dev.gtaia-test-domain.net/std-dev-lux-13100/insurance/persons/ID-wJsQC7HZH",
                    title: "Mlle Enfant CAS02-TNR-LIMITES_348 - 276773 -  né(e) le 01/05/1990 - CP inconnu"
                }
            ])
        }, 5000)
    }

    const Content:React.FC<Test> = ({onChange = () => null}: Test) => {
        const handleClick = (value: any) => {
            onChange(value);
        }

        return (
            <>
                <div className="search-fields">
                    <DxcInput
                        onChange={handleSearchChange}
                        value={searchValue}
                        placeholder="Ex: Chris"
                        margin="xsmall"
                        label="Search a Person"/>
                </div>
                
                <div className="results">
                    {
                        resultList.length > 0 &&
                            resultList.map((result: any, index: number) => (
                                <div key={index} className="result-row" onClick={() => handleClick(result)}>
                                    { result}
                                </div>
                            ))
                    }

                    {
                        resultList.length === 0 &&
                            <span>No results...</span>
                    }
                </div>
            </>
        )
        
    }

    return (
        <>
            <DxcTabs
                activeTabIndex={mainActiveTab}
                onTabClick={onMainTabClick}
                tabs={mainTabs}></DxcTabs>
            {
                mainActiveTab === 0 && (
                    <>
                        <DxcTabs
                            activeTabIndex={secondaryActiveTab}
                            onTabClick={onSecondaryTabClick}
                            tabs={componentsTabs}></DxcTabs>

                        {
                            secondaryActiveTab === 0 && (
                                <div className="q-secondaryTabContent spaced">
                                    <GlobalSearchMaterial
                                        entitiesList={entities}
                                        onSearch={(entity, property, search) => getData(entity, property, search)}
                                        onSelect={handleSelect} />

                                    {
                                        Object.keys(selectedValue).length > 0 
                                            ? <span>{JSON.stringify(selectedValue)}</span> 
                                            : <span>
                                                If no data, try with : 
                                                <ul>
                                                    <li>Entity: <em>Contract</em></li>
                                                    <li>Property: <em>contract - number</em></li>
                                                    <li>Value: <em>IUL000</em></li>
                                                </ul>
                                            </span>
                                    }
                                </div>
                            )
                        }

                        {
                            secondaryActiveTab === 1 && (
                                <>
                                    <div className="q-secondaryTabContent centered">
                                        <div className="row">
                                            <input value={val} type="text" onChange={(e) => setVal(e.target.value)}/>
                                            <button onClick={() => setIsOpen(true)}>Open dialog</button>
                                        </div>

                                        <Dialog
                                            closeIconIsVisible={false}
                                            isOpen={isOpen}
                                            onCancel={handleDialogCancel}
                                            onApply={handleDialogApply}
                                            title="Title">
                                            <Content/>
                                        </Dialog>
                                    </div> 
                                </>
                            )
                        }
                    </>
                )
            }

            {
                mainActiveTab === 1 && (
                    <div className="q-mainTabContent"></div>
                )
            }
        </>
    );
};

export default TrainingQuentin;