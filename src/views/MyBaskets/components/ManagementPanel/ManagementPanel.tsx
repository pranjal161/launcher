import AllBasketsMenu from "views/MyBaskets/components/AllBasketsMenu/AllBasketsMenu";
import Card from "components/Card/Card";
import MostViewedMenu from '../MostViewedMenu/MostViewedMenu';
import React from 'react';
import SearchBaskets from '../SearchBasket/SearchBaskets';
import {useTranslation} from 'react-i18next';

const ManagementPanel = (props: any) => {
    const {searchBasket, searchedBaskets, selectedBasket, ticketsAssignedToBasket} = props;

    const {t} = useTranslation();
    const mostviewBaskets = searchedBaskets ? [...searchedBaskets].splice(0,2) :[]

    return (
        <>
            <Card title={<SearchBaskets searchBasket={searchBasket}/>}>
                <MostViewedMenu title={t('_MOST_VIEWED')} selectedId={selectedBasket.id} viewedBaskets={mostviewBaskets}
                    onBasketClick={ticketsAssignedToBasket} />
                <AllBasketsMenu title={t('_ALL_BASKETS')} basketId={selectedBasket.id} baskets={searchedBaskets}
                    onBasketClick={ticketsAssignedToBasket} {...props}/>
            </Card>
        </>
    );
};

export default ManagementPanel;
