import './styles.scss';

import { componentsTabs, mainTabs } from './models/tabs';

import { DxcTabs } from '@dxc-technology/halstack-react';
import GlobalSearchDXC from './components/GlobalSearchDXC/GlobalSearchDXC';
import GlobalSearchMaterial from './components/GlobalSearchMaterial/GlobalSearchMaterial';
import React from "react";
import axios from 'axios';
import {entities} from './models/data.js';

const TrainingQuentin = () => {
    
    const [mainActiveTab, setMainActiveTab] = React.useState(0);
    const [secondaryActiveTab, setSecondaryActiveTab] = React.useState(0);
    const [selectedValue, setSelectedValue] = React.useState({});

    const onMainTabClick = (i: number) => {
        setMainActiveTab(i);
    };
    const onSecondaryTabClick = (i: number) => {
        setSecondaryActiveTab(i);
    };

    const getData = async (entity: string, property: string, searchValue: string) => {
        const entityGroup = `${entity.toLowerCase()}s`;
        const res = await axios.get(`insurance/${entityGroup}?${property}=${searchValue}`);

        if (res.data._links.item) {
            return res.data._link.item;
        }
    }

    const handleSelect = (value: Object) => {
        console.log({value});
        setSelectedValue(value);
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
                                <div className="q-secondaryTabContent">
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
                                <div className="q-secondaryTabContent">
                                    <GlobalSearchDXC
                                        entitiesList={entities}
                                        onSearch={(entity, property, search) => getData(entity, property, search)}
                                        onSelect={handleSelect} />

                                    {
                                        Object.keys(selectedValue).length > 0 ? <span>{JSON.stringify(selectedValue)}</span> : <span>WIP</span>
                                    }
                                </div>
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