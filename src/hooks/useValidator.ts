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

import moment from "moment";

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

const useValidator = () => {

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
                break;
            case 'date':
                validate = ValidateDate(newValue, validate);
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

    const ValidateDate = (value: any, errorField: ErrorField) => {
        if(value && value !== '') {
            // to check date-fns validation
            const dateReg = new RegExp("^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$");
            const dateValidation = dateReg.test(value);
            if (dateValidation === false) {
                errorField.error = 'INVALID_DATE';
                errorField.valid = false;
            }
        }
        return errorField
    }

    const DateSeparator = (value: string) => {
        if (value && value.length === 2) {
            value = value.slice(0,2) + "-";
        } else if (value && value.length > 5) {
            value = value.split('-').join("");
            value = value.slice(0,2) + "-" + value.slice(2,4) + "-" + value.slice(4,8);
        }
        return value;
    }

    const APIDateFormatter = (value: string) => {
        // to use date-fns format 
        value = moment(value).format("YYYY-MM-DD")
        return value
    }

    return { FieldWrapper, Validation, DateSeparator, APIDateFormatter }
}

export default useValidator