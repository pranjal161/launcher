import { AppConfig } from '../config/appConfig';

export const getLink = (response: any, linkName: string) => {
    if (response &&
        response._links &&
        response._links[linkName] &&
        response._links[linkName].href) {
        return response._links[linkName].href;
    } else {
        return null;
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

export const getDescriptionValue = (value: any, id: string, tableData: any, type? :string) => {
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
                    }).format(value/100);
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