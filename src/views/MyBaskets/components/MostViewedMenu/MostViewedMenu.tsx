import { PanelBaskets } from '../../StyledBaskets';
import React from 'react';

const MostViewedMenu = (props:any) => {
    const { title, viewedBaskets, selectedId, onBasketClick } = props;
    const selected = (id: string) => selectedId === id;

    return (
        <PanelBaskets>
            <PanelBaskets.title>{title}</PanelBaskets.title>
            <PanelBaskets.ParentList className="mt-2 pr-1 pl-2">
                {viewedBaskets && viewedBaskets.map((basket: any) => <PanelBaskets.List key={basket.id} className={`cursor-pointer list-group-item d-flex justify-content-between align-items-center border-0 rounded-0 ${selected(basket.id) ? 'active' : ''}`} onClick ={() => onBasketClick(basket)}>
                    <PanelBaskets.ListTitle className="m-0">{basket.title}</PanelBaskets.ListTitle>
                    {basket.count && <small>{basket.count}</small>}
                </PanelBaskets.List>
                )}
            </PanelBaskets.ParentList>
        </PanelBaskets>
    );
};

export default MostViewedMenu;
