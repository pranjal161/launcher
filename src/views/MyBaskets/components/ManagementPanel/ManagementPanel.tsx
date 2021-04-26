import AllBasketsMenu from "views/MyBaskets/components/AllBasketsMenu/AllBasketsMenu";
import { DxcSidenav } from '@dxc-technology/halstack-react';
import MostViewedMenu from '../MostViewedMenu/MostViewedMenu';
import React from 'react';
import SearchBaskets from '../SearchBasket/SearchBaskets';
import { StyledSidenav } from '../../StyledBaskets';
import { useTranslation } from 'react-i18next';

const ManagementPanel = (props:any) => {
    const { searchBasket, searchedBaskets, selectedBasket, ticketsAssignedToBasket } = props;

    const { t } = useTranslation();
    const mostviewBaskets = [
        {id: '01', title: 'Adjust Savings', count: 76},
        {id: '02', title: 'Estimation', count: 22}
    ];

    return (
        <StyledSidenav>
            <DxcSidenav>
                <SearchBaskets searchBasket={searchBasket} />
                <MostViewedMenu title={t('_MOST_VIEWED')} viewedBaskets={mostviewBaskets} selectedId={'01'} onBasketClick={ticketsAssignedToBasket} />
                <AllBasketsMenu title={t('_ALL_BASKETS')} basketId={selectedBasket.id} baskets={searchedBaskets} onBasketClick={ticketsAssignedToBasket} {...props}/>
            </DxcSidenav>
        </StyledSidenav>
    );
};

export default ManagementPanel;