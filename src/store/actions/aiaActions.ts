import { AppConfig } from "config/appConfig";
import {aia} from "../../util/functions";

export const fetch = (href: string, callType = 'get', baId:string, params?: Object) => (dispatch: any, getState: any) => {
    const timestamp = Date.now()
    const actionPrefix = `BA_${callType.toUpperCase()}`
    dispatch({type: `${actionPrefix}_PENDING`, href, timestamp, baId})
    //Search if we have already fetch this hRef
    if (getState().aia[baId] && getState().aia[baId][href]) {
        dispatch({
            type: `${actionPrefix}_SUCCESS`,
            data: getState().aia[baId][href].data,
            store:getState().aia,
            params: params,
            href,
            baId
        })
        return Promise.resolve(getState().aia[baId][href]);
    } else {
        const promise = aia.get(href, params);
        promise.then(
            (response:any) => {
                dispatch({
                    type: `${actionPrefix}_SUCCESS`,
                    data: response.data,
                    store:getState().aia,
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
}

export const refresh = (href: string, callType = 'refresh', baId:string, params?: Object) => (dispatch: any, getState: any) => {
    const timestamp = Date.now()
    const actionPrefix = `BA_${callType.toUpperCase()}`

    dispatch({type: `${actionPrefix}_PENDING`, href, timestamp, baId})

    const promise = aia.get(href, params);
    promise.then(
        (response:any) => {
            dispatch({
                type: `${actionPrefix}_SUCCESS`,
                data: response.data,
                store:getState().aia,
                params: params,
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

export const post = (href: string, body: Object, baId: string, params?: Object) => (dispatch: any, getState:any) => {
    let callType = 'post';
    const actionPrefix = `BA_${callType.toUpperCase()}`
    dispatch({type: `${actionPrefix}_PENDING`, href, baId})

    const promise = aia.post(href, body, params);
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
        if (response && response.data && !response.data.messages) {
            dispatch({
                type: `BA_REFRESH_SUCCESS`,
                data: response.data,
                store:getState().aia,
                params: params,
                href,
                baId
            })
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

export const patch = (href: string, payload: Object, baId: string, params?: Object) => (dispatch: any, getState:any) => {
    let callType = 'patch';
    const actionPrefix = `BA_${callType.toUpperCase()}`
    dispatch({type: `${actionPrefix}_PENDING`, href, baId})
    const promise = aia.patch(href, payload, params);
    promise.then((response: any) => {
        // case1: modified headers recieved in response headers
        if (response && response.headers && response.headers[AppConfig.modifiedHeaderResTag]) {
            const modifiedUrls = response.headers[AppConfig.modifiedHeaderResTag]
            const existingHrefs = getState().aia[baId];
            processModifiedHeaders(modifiedUrls.split(','), existingHrefs, baId, dispatch);
        } 
        // case2: When patch response is in form of messages, check modified headers & refresh url to get full response
        else if (response && response.data && response.data.messages && response.data.messages.length > 0) {
            refresh(href, 'refresh', baId);
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
            store:getState().aia,
            params: params,
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

export const deleteRequest = (href: string, baId: string, params?: Object) => (dispatch: any, getState:any) => {
    let callType = 'delete';
    const actionPrefix = `BA_${callType.toUpperCase()}`
    dispatch({type: `${actionPrefix}_PENDING`, href, baId})

    const promise = aia.delete(href, params);
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

// checks if any modified URI exists in store & refresh it
const processModifiedHeaders = (modifiedArray: Array<Object | string>, existingMap: Array<any>, baId: string, dispatch:any) => {
    const requestArray :Array<Object> =[];
    if (modifiedArray) {
        // eslint-disable-next-line array-callback-return
        modifiedArray.map((message: any) => {
            if (Object.keys(existingMap).includes(message)) {
                requestArray.push(dispatch(refresh(message, 'refresh', baId)));
            }
        })
        Promise.all(requestArray).then();
    }
}
