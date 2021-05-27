import React, { useState } from 'react';
import useValidator, { Field } from 'hooks/useValidator';

import { DxcInput } from '@dxc-technology/halstack-react';
import { useTranslation } from "react-i18next";

/**
 * Display a Input field
 * @param {props} props Contains information related to the input
 * @returns {*} Return the Input
 */
const TextField = (props: { propertyName: string; data: any; type?: string, onChangeMethod?: any, onBlurMethod?:any }) => {
    const { t } = useTranslation();
    const { propertyName, data, type, onChangeMethod, onBlurMethod } = props;
    const { FieldWrapper, Validation } = useValidator();
    const field: Field = FieldWrapper(data, propertyName, type );
    const [showError, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<String | null >(null);
    const [value, setValue] = useState(field?.value);
    
    const onChange = (value: any) => {
        const validatedOutput = Validation(field, value, type);
        setValue(value);
        setError(!validatedOutput.valid);
        if (!validatedOutput.valid) {
            setErrorMessage(validatedOutput.error)
        } else if (onChangeMethod) {
            onChangeMethod(value);
        }
    }

    const onBlur = (value: any) => {
        const validatedOutput = Validation(field, value, type);
        setValue(value);
        setError(!validatedOutput.valid);
        if (!validatedOutput.valid) {
            setErrorMessage(validatedOutput.error)
        } else if (onBlurMethod) {
            onBlurMethod(value);
        }
    }

    return (
        <span data-testid={propertyName}>
            <DxcInput
                label={t(propertyName)}
                size="fillParent"
                required={field?.required}
                disabled={field?.disabled}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                assistiveText={showError? errorMessage: null}
                invalid={showError}
            />
        </span>
    );
};

export default TextField