import { DxcInput } from '@dxc-technology/halstack-react';
import React from 'react';
import { StyledSidenavSearchInput } from 'styles/global-style';
import { useTranslation } from 'react-i18next';

const SearchBaskets = (props:any) => {
    const { searchBasket } = props;
    const { t } = useTranslation();

    return (
        <StyledSidenavSearchInput>
            <DxcInput
                label={t('_SEARCH_BASKET')}
                onChange={searchBasket}
                margin="medium"
            />
        </StyledSidenavSearchInput>
    );
};

export default SearchBaskets;
