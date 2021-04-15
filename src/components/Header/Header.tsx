import { DxcHeader, DxcLink, DxcSelect } from '@dxc-technology/halstack-react';
import React, { useContext, useState } from 'react';

import { ApplicationContext } from 'context/applicationContext';
import CreateButton from '../Tickets/CreateButton/CreateButton';
import DXCLogo from 'assets/dxc_logo.jpg';
import { SearchIcon } from 'assets/svg';
import SignedLinks from './components/SignedLinks/SignedLinks';
import en from 'assets/gb.jpg';
import fr from 'assets/fr.jpg';
import nl from 'assets/nl.jpg';
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

    const goToSearch = () => {
        history.push("/ContractSearch");
    }

    return (
        <DxcHeader
            logoSrc={DXCLogo}
            onClick={goToHome}
            padding={{ right: 'xsmall' }}
            content={
                <>
                    <div className="col-8 p-0">
                        <ul className="toolbar m-0">
                            <li><DxcLink onClick={() => { history.push('/home')}} underlined={false} text="Home" /></li>
                            <li><DxcLink onClick={() => { history.push('/Baskets')}} underlined={false} text="Baskets" /></li>
                            <li><DxcLink onClick={() => { history.push('/Tickets')}} underlined={false} text="My Tickets" /></li>
                            <li><DxcLink onClick={() => { history.push('/help')}} underlined={false} text="Help" /></li>
                            <li><DxcLink onClick={() => { history.push('/Training')}} underlined={false} text="Training pages" /></li>
                            <li><CreateButton /></li>
                        </ul>
                    </div>
                    <div className="col-1 pt-3 p-0 header-svg">
                        <p
                            aria-label="add an alarm"
                            onClick={goToSearch}
                        >
                            <SearchIcon />
                        </p>
                    </div>
                    <div className="col-2 p-0 flag-css">
                        <ul className="toolbar p-0 m-0">
                            <li>
                                <DxcSelect
                                    options={langs}
                                    onChange={changeLang}
                                    value={lang}
                                    margin="xxsmall"
                                    padding="xxsmall"
                                />
                            </li>
                            <SignedLinks />
                        </ul>
                    </div>
                </>
            }
        />
    )
}

export default Header;
