import { formatValue, getDescriptionFromOneOf } from '../../util/functions';

import React from 'react';
import { StyledLabel } from '../../styles/global-style';
import { useTranslation } from 'react-i18next';

/**
 * Display a label
 * @param {props} props Contains information related to the label
 * @returns {void} Return the label
 */
const Label = (props: { label?: string; propertyName: string; data: any; type?: string }) => {
    const { t } = useTranslation();
    const { label, propertyName, data, type } = props;
    let value, viewValue;

    // Functions to process Output
    /**
     * Retrieve description for a given data
     * @returns {void} Return the description
     */
    function processDataOutput() {
        if (data && data.hasOwnProperty(propertyName)) {
            value = data[propertyName];
            viewValue = getDescriptionFromOneOf(value, propertyName, data);

            if (type) {
                viewValue = formatValue(value, type);
            }

            return viewValue ? viewValue : value;
        }
    }

    return (
        <>
            {label && <StyledLabel>{t(label)}:</StyledLabel>}
            <label dangerouslySetInnerHTML={{ __html: processDataOutput() }}></label>
        </>
    );
};

export default Label;
