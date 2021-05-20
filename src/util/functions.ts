import { AppConfig } from '../config/appConfig';
import axios from 'axios';

export const aia = {
    // Params can be used to pass additional parameter to the request, in case we need change in headers, responseType etc
    get: (url: string, params?: { headers?: any; }) => axios.get(url, { headers: params && params.headers ? params.headers : AppConfig.headers }),
    post: (url: string, body: Object, params?: { headers?: any; }) => axios.post(url, body, { headers: params && params.headers ? params.headers : AppConfig.headers }),
    patch: (url: string, payload: Object, params?: { headers?: any; }) => axios.patch(url, payload, { headers: params && params.headers ? params.headers : AppConfig.headers }),
    delete: (url: string, params?: { headers?: any; }) => axios.delete(url, { headers: params && params.headers ? params.headers : AppConfig.headers })
}

/**
 * returns the href associated with the provided linkName under response._links
 * @param  {any} response pass the response Object received 
 * @param  {string} linkName linkName you're looking for under _links
 * @returns {string } returns href, if present
 */
export const getLink = (response: any, linkName: string) => {
    if (response &&
        response._links &&
        response._links[linkName] &&
        response._links[linkName].href) {
        return response._links[linkName].href;
    }
}

const mergeOptions = (options: any) => {
    let mergedOptions = {};
    if (options.oneOf.length > 1) {
        for (const item of options.oneOf) {
            mergedOptions = { ...mergedOptions, ...item };
        }
    }
    return mergedOptions;
}

export const getPropertyOptions = (tableData: any) => {
    let options;
    if (tableData._options && tableData._options.properties &&
        tableData._options.properties._links &&
        tableData._options.properties._links.properties &&
        tableData._options.properties._links.properties.item &&
        tableData._options.properties._links.properties.item.properties &&
        tableData._options.properties._links.properties.item.properties.summary &&
        tableData._options.properties._links.properties.item.properties.summary.properties) {
        options =
            tableData._options.properties._links.properties.item.properties.summary.properties;
        options = options && options.oneOf ? mergeOptions(options) : options;
        return options;
    }

}

export const getDescriptionValue = (value: any, id: string, tableData: any, type?: string) => {
    const options = getPropertyOptions(tableData);
    if (options && options[id] && options[id].oneOf) {
        for (const item of options[id].oneOf) {
            if (item.enum[0] === value) {
                value = item.title;
            }
        }
    } else if (type) {
        value = formatValue(value, type);
    }
    return value ? value : '';
}

export const getDescriptionFromOneOf = (value: string, id: string, response: any) => {
    if (
        response._options &&
        response._options.properties &&
        response._options.properties[id] &&
        response._options.properties[id]['oneOf']
    ) {
        for (let i = 0; i < response._options.properties[id]['oneOf'].length; i++) {
            if (
                response._options.properties[id]['oneOf'][i]['enum'][0] ===
                value
            ) {
                value = response._options.properties[id]['oneOf'][i]['title'];
            }
        }
    }
    return value;
}

export const formatValue = (value: any, style?: string | undefined) => {
    const intl = AppConfig.Intl;
    if (value !== null && value !== undefined) {
        let formattedValue;
        if (style) {
            switch (style) {
                case 'currency':
                    formattedValue = new Intl.NumberFormat(intl.locale, {
                        style: style,
                        currency: intl.currency
                    }).format(value);
                    break;
                case 'percent':
                    formattedValue = new Intl.NumberFormat(intl.locale, {
                        style: style,
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }).format(value / 100);
                    break;
                case 'decimal':
                    formattedValue = new Intl.NumberFormat(intl.locale).format(value);
                    break;
                case 'date':
                    if (value === '9999-99-99') {
                        // hardcoding> api fix
                        formattedValue = '99/99/9999'
                    } else {
                        const date = new Date(value);
                        formattedValue = new Intl.DateTimeFormat(intl.DateFormat).format(date);
                    }
                    break;
            }
        }
        return formattedValue ? formattedValue : value;
    }
}

export const paginationLink = (paginateUrl: string, page: number, perPageItems: number) => {
    if (paginateUrl) {
        const url = new URL(paginateUrl);
        const params = new URLSearchParams(url.search);
        const baseUrl = paginateUrl.includes('?') ? paginateUrl.split('?')[0] : paginateUrl;
        const start = (page - 1) * perPageItems + 1;
        params.set('_num', perPageItems.toString());
        params.set('_start', start.toString());
        return `${baseUrl}?${params.toString()}`;
    }
}

/** Checks whether the returned response is conistent or not
 * @param  {any} response provided response
 * @returns {boolean} returns true, if the resource is consistent
 */
export const isResponseConsistent = (response: any) => {
    if (response && response.data && response.data._embedded &&
        response.data._embedded['cscaia:status_report']) {
        return response.data._embedded['cscaia:status_report'].consistent;
    }
}

/** fetch status report from API response
 * @param  {any} response provided response
 * @returns {any} returned status report with consisted and messages property
 */
export const getStatusReport = (response: any): any => {
    if (response && response.data && response.data._embedded &&
        response.data._embedded['cscaia:status_report']) {
        return response.data._embedded['cscaia:status_report']
    }
}

/**
 * 
 * @param {date}date The initial date for which days will be added
 * @param {days} days Number of days that will be added on the initial date
 * @returns {date} The new date
 */
export function addDays(date: any, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);

    return result;
}

/**
 * Search person
 * @param {value} value that will be used for the search
 * @returns {*} Parameters for the search person
 */
export function searchPerson(value: string) {
    let url = AppConfig.hostUrl.defaultHostUrl + 'persons?';
    let params;
    const nameSelected = value;

    if (nameSelected && nameSelected !== '') {

        // First name is not empty
        if (nameSelected !== undefined) {
            params = 'person:last_name=' + nameSelected.charAt(0).toUpperCase() + nameSelected.slice(1);
        }
        if (params !== undefined || params !== null) {
            params = params + '*&_num=' + 30;
        }

        if (url !== undefined && (params !== undefined && params !== null)) {
            return (url + params);
        }
    }

    return ''
}

/**
 * Schema Search
 * @param {obj} obj that will be used for the search
 * @returns {*} Parameters for the search - for eg. persons, tickets, contracts
 */
export function search(obj: any) {
    const { searchUrl, name, value } = obj;
    let url = `${searchUrl}?`;
    let params;
    const nameSelected = value;

    if (nameSelected && nameSelected !== '') {

        if (nameSelected !== undefined) {
            params = name + '=' + nameSelected;
        }
        if (params !== undefined || params !== null) {
            params = params + '&_num=' + 30;
        }

        if (url !== undefined && (params !== undefined && params !== null)) {
            return (url + params);
        }
    }

    return ''
}

// Search and filter values as per passed parameter
export const getValues = (array: Array<any>, filterBy: string, matchingValue: string, returnValue?: string) => {
    const filter: any = array && array.filter((array: any) => array[filterBy] === matchingValue);
    return returnValue ? filter && filter[0] && filter[0][returnValue] : filter && filter[0];
}

export const getOneOfFromResponse = (response: any, id: string) => {
    const enumItemList = [];
    if (response && response._options &&
        response._options.properties &&
        response._options.properties[id] &&
        response._options.properties[id]['oneOf']) {
        const oneOfArray: Array<any> = response._options.properties[id]['oneOf'];
        const processedList = [];
        for (const item of oneOfArray) {
            // to add check for current lang when picking enum title
            const isExisting = processedList.filter((array: any) => array.enum === item.enum);
            if (isExisting.length === 0) {
                processedList.push(item);
                enumItemList.push({ value: item.enum[0], label: item.title });
            }
        }
    }
    return enumItemList;
}

/** Check whether a PATCH operation can be performed on the field provided
 * @param  {any} response provided response
 * @param  {string} field field which should be checked for edit capability
 * @returns {boolean} true, if PATCH operation is available for the provided field
 */
export const isFieldEditable = (response: any, field: string): boolean => {
    if (response && response['_options']) {
        const patchLink = response['_options']['links'].find((item: any) => item.method === 'PATCH');
        if (!patchLink) {
            return false;
        }
        return patchLink &&
            patchLink['schema'] &&
            patchLink['schema']['properties'] &&
            patchLink['schema']['properties'][field]
            // eslint-disable-next-line no-unneeded-ternary
            ? true
            : false;
    }
    return false;

}

/**Whether the propertyName provided is a required field. 
 * @param  {any} response provided response
 * @param  {string} field the field/propertyName which should be checked whether required
 * @returns {boolean} true, if present in required array in API
 */
export const isFieldRequired = (response: any, field: string) => (
    response && response['_options'] &&
    response['_options']['required'] &&
    response['_options']['required'].indexOf(field) !== -1
)

/**Whether the propertyName provided is available for GET. If avaiable for GET, it should be visible, else not.
 * @param  {any} response provided response
 * @param  {string} field the field/propertyName which should be checked for visibility
 * @returns {boolean} true, if allowed for GET and therefore should be visible on screen
 */
export const isFieldVisible = (response: any, field: string): boolean => {
    if(response && response['_options'] &&
    response['_options']['properties'] &&
    response['_options']['properties'][field]) {
        return true;
    } else {
        return false;
    }
}

/** If POST method is allowed on the current href
 * @param  {any} response provided response 
 * @returns {boolean} whether the POST operation is available for href
 */
export const isFieldCreatable = (response: any): boolean => {
    if (response && response['_options'] && response['_options']['links']) {
        const postLink = response['_options']['links'].find((item: any) => item.method === 'POST');
        if (postLink.isEmpty()) {
            return false;
        }
        return true;
    }
    return false;
}

/** If DELETE method is allowed on the current href or response._links.self.href
 * @param  {any} response provided response 
 * @returns {boolean} whether the DELETE operation is available for href
 */
export const isFieldDeletable = (response: any): boolean => {
    if (response && response['_options'] && response['_options']['links']) {
        const deleteLink = response['_options']['links'].find((item: any) => item.method === 'DELETE');
        if (deleteLink.isEmpty()) {
            return false;
        }
        return true;
    }
    return false;
}

export const hasRelInOptions = (response: any, rel: string): boolean => response && response._options && response._options['links'] && response['_options']['links'].find((item: any) => item.rel === rel)

export const hasMethodInOptions = (response: any, method: string): boolean => response && response._options && response._options['links'] && response['_options']['links'].find((item: any) => item.method === method)

/** To check if 'cscaia:save' link is available in _links of the provided response
 * @param  {any} resource response object
 * @returns {boolean} whether the link is present or not
 */
export const isSaveOperationAvailable = (resource: any): boolean => {
    if (getLink(resource, 'cscaia:save')) {
        return true;
    } else {
        return false;
    }
}

/** Fetches the title of the resource from _links.self.title
 * @param  {any} response provided response
 * @returns {string|null} title of the resource if pr
 */
export const getTitle = (response: any): string | null => {
    if (response &&
        response._links &&
        response._links['self'] &&
        response._links['self'].title) {
        return response._links['self'].title;
    } else {
        return null;
    }
}

/** Fetches allowed minlength from API for a property
 * @param  {any} response API response provided
 * @param  {string} propertyName concerned propertyName 
 * @returns {number| null} allowed min Length value
 */
export const getMinLength = (response: any, propertyName: string) => {
    if (response && response['_options'] &&
        response['_options']['properties'] &&
        response['_options']['properties'][propertyName] &&
        response['_options']['properties'][propertyName].minLength) {
        return response['_options']['properties'][propertyName].minLength;
    }
}

/** Fetches allowed maxlength from API for a property
 * @param  {any} response API response provided
 * @param  {string} propertyName concerned propertyName 
 * @returns {number| null} allowed maxLength value
 */
export const getMaxLength = (response: any, propertyName: string) => {
    if (response && response['_options'] &&
        response['_options']['properties'] &&
        response['_options']['properties'][propertyName] &&
        response['_options']['properties'][propertyName].maxLength) {
        return response['_options']['properties'][propertyName].maxLength;
    }
}

/** Fetches allowed minimum allowed value from API for a property
 * @param  {any} response API response provided
 * @param  {string} propertyName concerned propertyName 
 * @returns {number| null} allowed minimum value
 */
export const getMinValue = (response: any, propertyName: string) => {
    if (response && response['_options'] &&
        response['_options']['properties'] &&
        response['_options']['properties'][propertyName] &&
        response['_options']['properties'][propertyName].minimum) {
        return response['_options']['properties'][propertyName].minimum;
    }
}

/** Fetches allowed maximum allowed value from API for a property
 * @param  {any} response API response provided
 * @param  {string} propertyName concerned propertyName 
 * @returns {number| null} allowed maximum value
 */
export const getMaxValue = (response: any, propertyName: string) => {
    if (response && response['_options'] &&
        response['_options']['properties'] &&
        response['_options']['properties'][propertyName] &&
        response['_options']['properties'][propertyName].maximum) {
        return response['_options']['properties'][propertyName].maximum;
    }
}

/** Returns the type of property 
 * @param  {any} response API response provided
 * @param  {string} propertyName concerned propertyName 
 * @returns {string} type like number, array, string etc
 */
export const getPropertyType = (response: any, propertyName: string) => {
    if (response && response['_options'] &&
    response['_options']['properties'] &&
    response['_options']['properties'][propertyName] &&
    response['_options']['properties'][propertyName].type) {
        return response['_options']['properties'][propertyName].type;
    }
}