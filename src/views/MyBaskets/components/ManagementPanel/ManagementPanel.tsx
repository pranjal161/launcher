import AllBasketsMenu from "views/MyBaskets/components/AllBasketsMenu/AllBasketsMenu";
import Card from "components/Card/Card";
import MostViewedMenu from '../MostViewedMenu/MostViewedMenu';
import React from 'react';
import SearchBaskets from '../SearchBasket/SearchBaskets';
import {useTranslation} from 'react-i18next';
import styled from "styled-components";

const Root = styled.div`
  width: 300px;
  background: #FFFFFF;
  margin-right: 20px;
  overflow: hidden;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  height: auto;
`;


const ManagementPanel = (props: any) => {
    const {searchBasket, searchedBaskets, selectedBasket, ticketsAssignedToBasket} = props;

    const {t} = useTranslation();
    const mostviewBaskets = searchedBaskets ? [...searchedBaskets].splice(0,2) :[]

    return (
        <Root>
            <Card title={<SearchBaskets searchBasket={searchBasket}/>}>
                <MostViewedMenu title={t('_MOST_VIEWED')} selectedId={selectedBasket.id} viewedBaskets={mostviewBaskets}
                                onBasketClick={ticketsAssignedToBasket} />
                <AllBasketsMenu title={t('_ALL_BASKETS')} basketId={selectedBasket.id} baskets={searchedBaskets}
                                onBasketClick={ticketsAssignedToBasket} {...props}/>
            </Card>
        </Root>
    );
};

export default ManagementPanel;
