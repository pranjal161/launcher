import React, {useEffect} from 'react';

import {DxcButton} from "@dxc-technology/halstack-react";

/**
 * Display DXC button with onClick action
 * @param {props} props Information that will be used for the button
 * @returns {*} Display DXC button with onClick action
 */
function CommunicateAcrossBrowser(props) {
    const handleSetLocalstorage = () => {
        window.localStorage.setItem('loggedIn', 'Hello')
    }
    
    useEffect(() => {
        const handleLocalStorage = (event) => {
            if (event.storageArea !== localStorage) 
                return;
            
            if (event.key === 'loggedIn') {
                // Do something with event.newValue
                window.alert('ça marche ' + event.newValue)
            }
        }

        window.addEventListener('storage', handleLocalStorage)
        
        return () => window.removeEventListener('storage', handleLocalStorage)
    },[])
    
    return (
        <div>
            <DxcButton
                mode="primary"
                label="Test localstorage event"
                onClick={handleSetLocalstorage}
                margin="small"
            />
        </div>
    );
}

export default CommunicateAcrossBrowser;
