import React, { useState } from 'react';
import { StyledPaginator } from '../../styles/global-style';
import { DxcPaginator } from '@dxc-technology/halstack-react';
import { paginationLink } from '../../util/functions';

const Paginator = (props: { totalItems: string | number, itemsPerPage: number, url: string, handler: any}) => {

    const { totalItems, itemsPerPage, url, handler } = props;
    const [page, changePage] = useState(1);

    const prevClick = () => {
        changePage(page - 1);
        navigatePage(page - 1);
    };

    const firstClick = () => {
        changePage(1);
        navigatePage(1);
    };

    const nextClick = () => {
        changePage(page + 1);
        navigatePage(page + 1);
    };
    
    const lastClick = (currPage: number) => {
        changePage(currPage);
        navigatePage(currPage);
    };

    const navigatePage = (pagenumber: number) => {
        const paginateUrl = url;
        const navigateTo = paginationLink(paginateUrl, pagenumber, itemsPerPage);
        handler(navigateTo ? navigateTo : '');
    };

    return (
        <>
            <StyledPaginator>
                <DxcPaginator currentPage={page}
                    itemsPerPage={itemsPerPage}
                    totalItems={totalItems}
                    prevFunction={prevClick}
                    firstFunction={firstClick}
                    nextFunction={nextClick}
                    lastFunction={lastClick}
                />
            </StyledPaginator>
        </>
    )
}

export default Paginator;