import React, { useState } from 'react';
import { StyledPaginator } from '../../styles/global-style';
import { DxcPaginator } from '@dxc-technology/halstack-react';
import { paginationLink } from '../../util/functions';

const Paginator = (props: { totalItems: string | number, itemsPerPage: number, data: any, handler: any}) => {

    const { totalItems, itemsPerPage, data, handler } = props;
    const [page, changePage] = useState(1);

    const prevClick = () => {
        changePage(page - 1);
        const prevLink = data && data['_links'] && data['_links'] && data['_links']['prev'];
        handler(prevLink['href']);
    };

    const firstClick = () => {
        changePage(1);
        const firstLink = data && data['_links'] && data['_links'] && data['_links']['first'];
        handler(firstLink['href']);
    };

    const nextClick = () => {
        changePage(page + 1);
        const nextLink = data && data['_links'] && data['_links'] && data['_links']['next'];
        handler(nextLink['href']);
    };

    const lastClick = (currPage: number) => {
        changePage(currPage);
        // To be discussed
        const link = data && data['_links'] && data['_links'] && data['_links']['first'];
        const lastLink = paginationLink(link['href'], currPage, itemsPerPage);
        handler(lastLink);
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