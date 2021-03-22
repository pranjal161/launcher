import React, { useState, useEffect } from 'react';
import { StyledPaginator } from '../../styles/global-style';
import { DxcPaginator } from '@dxc-technology/halstack-react';
import { paginationLink, getLink } from '../../util/functions';

const Paginator = (props: { totalItems: string | number, itemsPerPage: number, data: any, handler: any}) => {

    const { totalItems, itemsPerPage, data, handler } = props;
    const [page, changePage] = useState(1);
    const firstLink = data && data['_links'] && data['_links']['first'] ? data['_links']['first'].href : '';

    useEffect(() => {
        changePage(1);
    }, [firstLink]);

    const prevClick = () => {
        changePage(page - 1);
        const prevLink = getLink(data, 'prev');
        handler(prevLink);
    };

    const firstClick = () => {
        changePage(1);
        const firstLink = getLink(data, 'first');
        handler(firstLink);
    };

    const nextClick = () => {
        changePage(page + 1);
        const nextLink = getLink(data, 'next');
        handler(nextLink);
    };

    const lastClick = (currPage: number) => {
        changePage(currPage);
        // To be discussed
        const link = getLink(data, 'first');
        const lastLink = paginationLink(link, currPage, itemsPerPage);
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