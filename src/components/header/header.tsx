import { DxcHeader, DxcSelect } from '@dxc-technology/halstack-react';
import React, { useContext, useState } from 'react';

import { ApplicationContext } from '../../context/applicationContext';
import DXCLogo from '../../assets/dxc_logo_wht.png';
import en from '../../assets/gb.jpg';
import fr from '../../assets/fr.jpg';
import nl from '../../assets/nl.jpg';
import { useHistory } from 'react-router-dom';

const Header = () => {
    const history = useHistory();
    const applicationContext = useContext(ApplicationContext);
    const [lang, setLang] = useState<string>(applicationContext.language);

    const langs = [
        {
            value: 'fr',
            label: 'FR',
            iconSrc: fr,
        },
        {
            value: 'en',
            label: 'EN',
            iconSrc: en,
        },
        {
            value: 'nl',
            label: 'NL',
            iconSrc: nl,
        },
    ];

    const changeLang = (value: string) => {
        // to check refresh
        setLang(value);
        if (value !== applicationContext.language) {
            applicationContext.changeLang(value);
        }
    };

    const goToHome = () => {
        history.push('/home');
    };

    return (
        <>
            <DxcHeader
                logoSrc={DXCLogo}
                onClick={goToHome}
                padding={{ right: 'xsmall' }}
                content={
                    <>
                        <DxcSelect
                            options={langs}
                            onChange={changeLang}
                            value={lang}
                            margin="xxsmall"
                            padding="xxsmall"
                        ></DxcSelect>
                    </>
                }
            />
        </>
    );
};

export default Header;
