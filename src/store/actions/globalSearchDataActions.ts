import {aia, getValues} from "util/functions";

import { AppConfig } from '../../config/appConfig';

export const loadData = (params: {collection: string, rel: string, schema: string, search: any}) => (dispatch: any) => {
    const { collection, rel, schema, search } = params;
    const id = collection;
    const href = `${AppConfig.hostUrl.defaultHostUrl}${schema}`;
    const callToHref = `${href}?_num=10`;
    const timestamp = Date.now()
    dispatch({type: `DATA_FETCH_HREF_START`, id, href, timestamp})
    let result: { _options: {links: any}};

    const getResponse = Promise.resolve(aia.get(callToHref));
    getResponse.then((response) => {
        result = response.data;
        return response.data;
    }).then(() => {
        const responseOptions = result && result['_options'] && result['_options']['links'] ? result['_options']['links'] : [];
        const options = getValues(responseOptions, 'rel', rel, 'schema');
        const properties = options && options['properties'];
        const values = search && search.map((array: {value: string}) => { 
            let final;
            if (Object.keys(properties).includes(array.value)) {
                const propValues = properties[array.value];
                const option = {...array, ...propValues};
                final = option;
            }
            return final;
        }).filter((array: {value: string}) => array);
        dispatch({type: 'DATA_FETCH_HREF_SUCCESS', id, href, values, timestamp})
    });
}