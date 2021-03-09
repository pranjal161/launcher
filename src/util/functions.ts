
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

export const getDescriptionValue = (value: any, id: string, tableData: any) => {
    const options = getPropertyOptions(tableData);
    if (options && options[id] && options[id].oneOf) {
        for (const item of options[id].oneOf) {
            if (item.enum[0] === value) {
                value = item.title;
            }
        }
    }
    return value ? value : '';
}