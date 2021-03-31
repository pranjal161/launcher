import React, { useState } from 'react';

const AlertContext = React.createContext({
    toastMessage: {},
    setToastList: (statusReport: any) => { 
        // Nothing to do 
    },
});

const AlertContextProvider = ({ children }: { children: any }) => {
    const [alertMessage, setStatusReport] = useState({});

    return (
        <AlertContext.Provider value={{ toastMessage: alertMessage, setToastList: setStatusReport }}>
            {children}
        </AlertContext.Provider>
    );
};

export { AlertContext, AlertContextProvider };
