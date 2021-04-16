import "./TabButton.css"

import {CloseIcon} from "../../../../assets/svg";
import React from 'react';


const TabsButton = ( props : {
                                isActive: boolean,
                                tabId: string,
                                label: string,
                                onTabClick: any,
                                onTabCloseClick: Function}) => {

    const { 
            isActive = false,
            tabId,
            label = "Loading",
            onTabClick,
            onTabCloseClick
    } = props;

    let tabDivClass = "tabs__tab";
    if(isActive)
        tabDivClass += " tabs__tab--active";

    const handleTabClose = (e: React.ChangeEvent<any>, tabId: string) => {
        e.stopPropagation();
        onTabCloseClick(tabId);
    }

    return (
        <div className={tabDivClass}
            onClick={onTabClick}>
            <div>
                <span>{label}</span>
                <span onClick={(e) => handleTabClose(e, tabId)}>
                    <CloseIcon />
                </span>
            </div>
        </div>
    );
}

export default TabsButton;