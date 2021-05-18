import React from 'react';

const Tab = (props: {
                        children: any,
                        tabId: string,
                        tabLabel: string,
                        isActiveTab?: boolean
                    }) => {
    const { children } = props;
    
    return (
        <>
            {children}
        </>
    );
}

export default Tab; 

export const MemoTab = React.memo(Tab)