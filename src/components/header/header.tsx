import DXCLogo from '../../assets/dxc_logo_wht.png';
import fr from '../../assets/fr.jpg';
import nl from '../../assets/nl.jpg';
import en from '../../assets/gb.jpg';
import i18n from '../../i18n';
import {
    DxcHeader,
    DxcSelect
} from '@dxc-technology/halstack-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { AppConfig } from '../../config/appConfig';

const Header = () => {

    const { t } = useTranslation();
    const [value, setLang] = useState<string | undefined | null>(localStorage.getItem('i18nextLng'))

    const langs = [
        {
            value: 'fr',
            label: 'FR',
            iconSrc: fr
        },
        {
            value: 'en',
            label: 'EN',
            iconSrc: en
        },
        {
            value: 'nl',
            label: 'NL',
            iconSrc: nl
        }
    ];

    const changeLang = (value: string | undefined) => {
        // to check refresh
        i18n.changeLanguage(value);
        setLang(value);
        AppConfig.headers['accept-language'] = localStorage.getItem('i18nextLng');
    }

    return (
        <>
            <DxcHeader
                logoSrc={DXCLogo}
                padding={{ right: 'xsmall' }}
                content={
                    <>
                        <DxcSelect
                            options={langs}
                            onChange={changeLang}
                            value={value}
                            margin="xxsmall"
                            padding="xxsmall"
                        ></DxcSelect>
                    </>
                }
            />
        </>
    )
}

export default Header;