import { DxcTabs } from '@dxc-technology/halstack-react';
import React from 'react';
import { TabbedLinksLabels } from './PrimaryTabsConstants';

const PrimaryTabs = (props : {
                                value: number | null,
                                onChange: Function
                            }) => {

    const {value, onChange} = props;
    
    const handleTabClick = (index:number) => {
        onChange(index);
    }

    return (
        <DxcTabs 
            tabs={TabbedLinksLabels}
            activeTabIndex={value === null ? false : value }
            onTabClick={handleTabClick} />
    );
}

export default PrimaryTabs;