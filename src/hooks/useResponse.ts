import {
    getMaxLength,
    getMaxValue,
    getMinLength,
    getMinValue,
    getPropertyType,
    isFieldEditable,
    isFieldRequired,
    isFieldVisible
} from "util/functions";

export interface Field {
        min: number,
        max: number,
        visible: boolean,
        disabled: boolean,
        required: boolean,
        minLength: number,
        maxLength: number,
        value: any,
        type: any
}

export interface ErrorField {
    error: string | null,
    valid: boolean
}

const useResponse = () => {

    const FieldWrapper = ( data: any, propertyName?: any, type?: string) => {
        let field: Field = {
            min: getMinValue(data, propertyName),
            max: getMaxValue(data, propertyName),
            visible: isFieldVisible(data, propertyName),
            disabled: !isFieldEditable(data, propertyName),
            required: isFieldRequired(data, propertyName),
            minLength: getMinLength(data, propertyName),
            maxLength: getMaxLength(data, propertyName),
            value: data && data.hasOwnProperty(propertyName) ? data[propertyName] : undefined,
            type: type? type: getPropertyType(data, propertyName)
        }
        return field;
    }

    const Validation = (InputWrapper: Field, newValue: any, type?:string) => {
        let validate: ErrorField = {
            error: '',
            valid: true
        }
        validate = ValidateMinMaxValue(InputWrapper, newValue, validate);
        validate = ValidateMinMaxlength(InputWrapper, newValue, validate);

        switch(type) {
            case 'email':
                validate = ValidateEmail(newValue, validate);
                break;
            case 'number':
                validate = ValidateNumber(newValue, validate);
        }
        return validate;
    }

    const ValidateMinMaxValue = (InputWrapper: Field, value: any, errorField: ErrorField): ErrorField => {
        //Check for max and min values
        if (InputWrapper?.min || InputWrapper?.max) {
            if ((value as Number) > InputWrapper.max) {
                errorField.error = 'MORE_THAN_MAXVALUE';
                errorField.valid = false
            } else if ((value as Number) < InputWrapper?.min) {
                errorField.error = 'LESS_THAN_MINVALUE';
                errorField.valid = false
            }
            return errorField;
        }
        return errorField;
    }

    const ValidateMinMaxlength = (InputWrapper: Field, value: any, errorField: ErrorField): ErrorField => {
        //Check for max and min values
        if (InputWrapper?.minLength || InputWrapper?.maxLength) {
            if (value.length > InputWrapper?.maxLength) {
                errorField.error = 'MORE_THAN_MAXLENGTH';
                errorField.valid = false
            } else if (value.length < InputWrapper?.minLength) {
                errorField.error = 'LESS_THAN_MINLENGTH';
                errorField.valid = false
            }
            return errorField;
        }
        return errorField;
    }

    
    const ValidateEmail = (value: any, errorField: ErrorField) => {
        if (value && value !== '') {
            const emailRegex = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$');
            const emailValidation = emailRegex.test(value);
            if (emailValidation === false) {
                errorField.error = '_ENTER_VALID_EMAIL';
                errorField.valid = false;
            }
        }  
        return errorField;
    }

    const ValidateNumber = (value: any, errorField: ErrorField) => {
        if(value && value !== '') {
            if (!Number(value)) {
                errorField.error = 'INVALID_NUMBER';
                errorField.valid = false;
            }
        }
        return errorField;
    }

    return { FieldWrapper, Validation }
}

export default useResponse