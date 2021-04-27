import { PanelBaskets } from '../../StyledBaskets';
import PropTypes from 'prop-types'
import React from 'react';

const AllBasketsMenu = (props: any) => {
    const {title, baskets, onBasketClick, basketId} = props;
    const selected = (id: string) => basketId === id;

    return (
        <PanelBaskets className="baskets-menu">
            <PanelBaskets.title>{title}</PanelBaskets.title>
            <PanelBaskets.ParentList className="mt-2 pr-1 pl-2">
                {baskets && baskets.map((basket: any) => <PanelBaskets.List key={basket.id} className={`cursor-pointer d-flex justify-content-between align-items-center border-0 rounded-0 ${selected(basket.id) ? 'active' : ''}`} onClick ={() => onBasketClick(basket)}>
                    <PanelBaskets.ListTitle className="m-0">{basket.title}</PanelBaskets.ListTitle>
                    {basket.count !== undefined && <small>{basket.count}</small>}
                </PanelBaskets.List>
                )}
            </PanelBaskets.ParentList>
        </PanelBaskets>
    );
}

AllBasketsMenu.propTypes = {
    title: PropTypes.string,
    baskets: PropTypes.array,
    onBasketClick: PropTypes.func,
    basketId: PropTypes.string
}

export default AllBasketsMenu;
