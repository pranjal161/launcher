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
        history.push("/contractSearch");
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
                            <li><DxcLink href="/omnichannel/react/home" underlined={false} text="Home" /></li>
                            <li><DxcLink href="/omnichannel/react/baskets/all" underlined={false} text="Baskets" /></li>
                            <li><DxcLink href="/omnichannel/react/tickets/myTickets" underlined={false} text="My Tickets" /></li>
                            <li><DxcLink href="/omnichannel/react/help" underlined={false} text="Help" /></li>
                            <li><DxcLink href="/omnichannel/react/training" underlined={false} text="Training pages" /></li>
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
                        <ul className="toolbar m-0">
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
