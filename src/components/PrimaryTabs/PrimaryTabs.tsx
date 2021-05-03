import { DxcTabs } from '@dxc-technology/halstack-react';
import React from 'react';
import { TabbedLinksLabels } from './PrimaryTabsConstants';

const PrimaryTabs = (props : {
                                value: number,
                                onChange: Function
                            }) => {

    const {value, onChange} = props;
    
    const handleTabClick = (index:number) => {
        onChange(index);
    }

    return (
        <DxcTabs 
            tabs={TabbedLinksLabels}
            activeTabIndex={value}
            onTabClick={handleTabClick} />
    );
}

export default PrimaryTabs;