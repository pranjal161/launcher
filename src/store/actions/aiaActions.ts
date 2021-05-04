import { AppConfig } from "config/appConfig";
import {aia} from "../../util/functions";

export const fetch = (href: string, callType = 'get', baId?:string | undefined) => (dispatch: any, getState: any) => {
    //Search if we have already fetch this hRef
    //const hRefs = getState().aia.hRefs
    const timestamp = Date.now()
    //const alreadyFetched = hRefs[hRef] && hRefs[hRef].status === "succeeded"
    const actionPrefix = `BA_${callType.toUpperCase()}`

    //dispatch({type: `${actionPrefix}_START`, hRef, timestamp})
    dispatch({type: `${actionPrefix}_PENDING`, href, timestamp, baId})

    const promise = aia.get(href);
    promise.then(
        (response:any) => {
            dispatch({
                type: `${actionPrefix}_SUCCESS`,
                data: response.data,
                href,
                baId
            })
        })
        .catch((error: any) => {
            dispatch({
                type: `${actionPrefix}_ERROR`,
                error,
                href,
                baId
            })
        })
    return promise
}

export const post = (href: string, body: Object, baId: string) => (dispatch: any, getState:any) => {
    let callType = 'post';
    const actionPrefix = `BA_${callType.toUpperCase()}`
    dispatch({type: `${actionPrefix}_PENDING`, href, baId})

    const promise = aia.post(href, body);
    promise.then((response: any) => {
        // case1: modified headers
        if (response && response.data && response.data.messages && response.data.messages.length > 0) {
            const messages = response.data.messages;
            const existingHrefs = getState().aia[baId];
            const modifiedArray: any = messages.find((message: any) => message.context === AppConfig.modifiedHeaderTag);
            if (modifiedArray) {
                processModifiedHeaders(modifiedArray.message, existingHrefs, baId, dispatch);
            }
        }
        dispatch({
            type: `${actionPrefix}_SUCCESS`,
            href
        })
    })
        .catch((error: any) => {
            dispatch({
                type: `${actionPrefix}_ERROR`,
                error,
                href
            })
        })
    return promise;
}

export const patch = (href: string, payload: Object, baId: string) => (dispatch: any, getState:any) => {
    let callType = 'patch';
    const actionPrefix = `BA_${callType.toUpperCase()}`
    dispatch({type: `${actionPrefix}_PENDING`, href, baId})

    const promise = aia.patch(href, payload);
    promise.then((response: any) => {
        // case1: modified headers
        if (response && response.headers && response.headers[AppConfig.modifiedHeaderResTag]) {
            const modifiedUrls = response.headers[AppConfig.modifiedHeaderResTag]
            const existingHrefs = getState().aia[baId];
            processModifiedHeaders(modifiedUrls.split(','), existingHrefs, baId, dispatch);
        }
        console.log(response);
        dispatch({
            type: `${actionPrefix}_SUCCESS`,
            data: response.data,
            href,
            baId
        })
    })
        .catch((error: any) => {
            dispatch({
                type: `${actionPrefix}_ERROR`,
                error,
                href,
                baId
            })
        })
    return promise;
}

export const deleteRequest = (href: string, baId: string) => (dispatch: any, getState:any) => {
    let callType = 'delete';
    const actionPrefix = `BA_${callType.toUpperCase()}`
    dispatch({type: `${actionPrefix}_PENDING`, href, baId})

    const promise = aia.delete(href);
    promise.then((response: any) => {
      
        if (response && response.data && response.data.messages && response.data.messages.length > 0) {
            const messages = response.data.messages;
            const existingHrefs = getState().aia[baId];
            const modifiedArray: any = messages.find((message: any) => message.context === AppConfig.modifiedHeaderTag);
            if (modifiedArray) {
                processModifiedHeaders(modifiedArray.message, existingHrefs, baId, dispatch);
            }
        }
        dispatch({
            type: `${actionPrefix}_SUCCESS`,
            data: response.data,
            href,
            baId
        })
    })
        .catch((error: any) => {
            dispatch({
                type: `${actionPrefix}_ERROR`,
                error,
                href,
                baId
            })
        })
    return promise;
}


const processModifiedHeaders = (modifiedArray: Array<Object | string>, existingMap: Array<any>, baId: string, dispatch:any) => {
    const requestArray :Array<Object> =[];
    if (modifiedArray) {
        // eslint-disable-next-line array-callback-return
        modifiedArray.map((message: any) => {
            if (Object.keys(existingMap).includes(message)) {
                requestArray.push(dispatch(fetch(message, 'get', baId)));
            }
        })
        Promise.all(requestArray).then();
    }
}
