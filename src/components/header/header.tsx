import DXCLogo from '../../assets/dxc_logo.jpg';
import fr from '../../assets/fr.jpg';
import nl from '../../assets/nl.jpg';
import en from '../../assets/gb.jpg';
import {DxcHeader, DxcSelect} from '@dxc-technology/halstack-react';
import React, {useContext, useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';

import {ApplicationContext} from '../../context/applicationContext';
import {SearchIcon} from '../../assets/svg';
import CreateButton from '../Tickets/CreateButton/CreateButton';
import SignedLinks from "./components/SignedLinks/SignedLinks";

const Header = () => {
    const history = useHistory();
    const applicationContext = useContext(ApplicationContext);
    const [lang, setLang] = useState<string>(applicationContext.language);

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
                padding={{right: 'xsmall'}}
                content={
                    <>
                        <div className="col-8 p-0">
                            <ul className="toolbar m-0">
                                <li><NavLink to="/home">Home</NavLink></li>
                                <li><NavLink to="/baskets/all">Baskets</NavLink></li>
                                <li><NavLink to="/tickets/myTickets">My Tickets</NavLink></li>
                                <li><NavLink to="/help">Help</NavLink></li>
                                <li><NavLink to="/training">Training pages</NavLink></li>
                                <li><CreateButton/></li>
                            </ul>
                        </div>
                        <div className="col-1 pt-3 p-0 header-svg">
                            <p
                                aria-label="add an alarm"
                                onClick={goToSearch}
                            >
                                <SearchIcon/>
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
                                <SignedLinks/>
                            </ul>
                        </div>
                    </>
                }
            />
        </>
    )
}

export default Header;
