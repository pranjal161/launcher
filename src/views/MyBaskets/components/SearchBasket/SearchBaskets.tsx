import { DxcInput } from '@dxc-technology/halstack-react';
import React from 'react';
import { StyledSidenav } from '../../StyledBaskets';
import { useTranslation } from 'react-i18next';

const SearchBaskets = (props:any) => {
    const { searchBasket } = props;
    const { t } = useTranslation();

    return (
        <StyledSidenav.SearchInput>
            <DxcInput
                label={t('_SEARCH_BASKET')}
                onChange={searchBasket}
                margin="medium"
            />
        </StyledSidenav.SearchInput>
    );
};

export default SearchBaskets;