import React, { useState } from 'react';
import useValidator, { Field } from 'hooks/useValidator';

import { DxcDate } from '@dxc-technology/halstack-react';
import { formatValue } from 'util/functions';
import { useTranslation } from "react-i18next";

/**
 * Display a Input field
 * @param {props} props Contains information related to the input
 * @returns {*} Return the Input
 */
const DateField = (props: { label: string; propertyName: string; data: any; type?: string, onChangeMethod?: any, onBlurMethod?: any }) => {
    const { t } = useTranslation();
    const { label, propertyName, data, type = 'date', onChangeMethod, onBlurMethod } = props;
    const { FieldWrapper, DateSeparator, Validation, APIDateFormatter } = useValidator();
    const field: Field = FieldWrapper(data, propertyName, type);
    const [showError, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<String | null>(null);
    const [value, setValue] = useState(field?.value ? formatValue(field.value, 'date') : field?.value);

    const onChange = ({stringValue, dateValue}: any) => {
        let viewValue = DateSeparator(stringValue);
        setValue(viewValue);
        setError(!dateValue);
        if (showError) {
            setErrorMessage("_INVALID_DATE")
        } else if (onChangeMethod) {
            let value = APIDateFormatter(viewValue)
            onChangeMethod(value);
        }
    }

    const onBlur = (stringValue: string) => {
        let viewValue = DateSeparator(stringValue);
        const validatedOutput = Validation(field, viewValue, 'date');
        setValue(viewValue);
        setError(!validatedOutput.valid);
        if (!validatedOutput.valid) {
            setErrorMessage(validatedOutput.error)
        } else if (onBlurMethod) {
            let value = APIDateFormatter(viewValue)
            onBlurMethod(value);
        }
    }

    return (
        <>
            <DxcDate
                label={t(label)}
                assistiveText={showError ? errorMessage : null}
                value={value}
                invalid={showError}
                placeholder
                format="dd-MM-yyyy"
                onBlur={onBlur}
                onChange={onChange}
            />
        </>
    );
};

export default DateField