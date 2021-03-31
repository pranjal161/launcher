import React, { useEffect, useState } from 'react';

import { AppConfig } from '../config/appConfig';
import i18n from '../i18n';

export interface SettingInterface {
    language: string;
    changeLang: (newLang: string) => void;
    headers: any;
}

const ApplicationContext = React.createContext<SettingInterface>({
    language: 'en',
    changeLang: (newLang: string) => { 
        // Nothing to do 
    },
    headers: AppConfig.headers,
});

const AppContextProvider = ({ children }: { children: any }) => {
    const [headers, changeHeaders] = useState(AppConfig.headers);

    const defaultSetting = {
        language: i18n.language ? i18n.language : 'en',
        headers: headers,
        changeLang: (newLang: string) => {
            const language = newLang.toLowerCase();
            i18n.changeLanguage(language);
            const newHeaders = headers;
            newHeaders['accept-language'] = language;
            changeHeaders(newHeaders);
            setSettings({ ...settings, language: language });
        },
    };

    const [settings, setSettings] = useState(defaultSetting);

    const setDefaultSetting = () => {
        setSettings(defaultSetting);
    };

    useEffect(() => {
        setDefaultSetting();
    }, []);

    return <ApplicationContext.Provider value={settings}>{children}</ApplicationContext.Provider>;
};

export { ApplicationContext, AppContextProvider };
