import DXCLogo from '../../assets/dxc_logo.jpg';
import fr from '../../assets/fr.jpg';
import nl from '../../assets/nl.jpg';
import en from '../../assets/gb.jpg';
import {
    DxcHeader,
    DxcSelect
} from '@dxc-technology/halstack-react';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ApplicationContext } from '../../context/applicationContext';
import { SearchIcon } from '../../assets/svg';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const history = useHistory();
    const applicationContext = useContext(ApplicationContext);
    const [lang, setLang] = useState<string>(applicationContext.language);
    const { t } = useTranslation();

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

    const changeLang = (value: string) => {
        // to check refresh
        setLang(value);
        if (value !== applicationContext.language) {
            applicationContext.changeLang(value);
        }
    }

    const goToHome = () => {
        history.push("/home");
    };

    const goToSearch = () => {
        history.push("/contractSearch");
    }

    return (
        <>
            <DxcHeader
                logoSrc={DXCLogo}
                onClick={goToHome}
                padding={{ right: 'xsmall' }}
                content={
                    <>
                        <div className="col-9">
                            <ul className="toolbar">
                                <li className="col-2"><NavLink to="/home">Home</NavLink></li>
                                <li className="col-2"><NavLink to="/home">Baskets</NavLink></li>
                                <li className="col-3"><NavLink to="/home">My Tickets</NavLink></li>
                                <li className="col-2"><NavLink to="/home">Help</NavLink></li>
                                <li className="col-4"><button>New Ticket</button></li>
                            </ul>
                        </div>
                        <div className="col-1 pt-3 p-0 header-svg">
                            <p
                                aria-label="add an alarm"
                                onClick={goToSearch}
                            >
                                {t('_SEARCH')}
                                <SearchIcon />
                            </p>
                        </div>
                        <div className="col-1 p-0 flag-css">
                            <DxcSelect
                                options={langs}
                                onChange={changeLang}
                                value={lang}
                                margin="xxsmall"
                                padding="xxsmall"
                            />
                        </div>
                    </>
                }
            />
        </>
    )
}

export default Header;
