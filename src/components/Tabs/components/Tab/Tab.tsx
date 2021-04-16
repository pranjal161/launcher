import React from 'react';

const Tab = (props: {
                        children: any,
                        tabId: string,
                        tabLabel: string,
                        onTabCloseClick: Function,
                        isActiveTab: boolean
                    }) => {
    const {children} = props;
    
    return (
        <>
            {children}
        </>
    );
}

export default Tab; 