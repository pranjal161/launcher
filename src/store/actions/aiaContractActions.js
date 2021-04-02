import {AppConfig} from "../../config/appConfig";
import {aia} from "../../util/functions";

const searchContract = (contractNumber) => AppConfig.hostUrl.defaultHostUrl + 'contracts?contract:number=' + contractNumber + '&_num=1'

export const get = (contractNumber) => (dispatch, getState) => {
    const part = 'data'
    let getContractUrl = searchContract(contractNumber)

    dispatch({type: 'FETCH_CONTRAT_DATA_START', contractNumber, part})
    return aia.get(getContractUrl).then(
        (response) => {
            if (response.data._count === 1) {
                let data = response.data._links.item
                data = !Array.isArray(data) ? [data] : data

                const contractUrl = data[0].href
                aia.get(contractUrl).then((response) => {
                    dispatch({
                        type: 'FETCH_CONTRAT_DATA_SUCCESS',
                        contractNumber,
                        part,
                        data: response.data,
                        url: contractUrl
                    })
                    getRisks(contractNumber)(dispatch, getState)
                    return true
                })
            } else {
                const errorMessage = 'Contrat not found or too many : ' + response._count
                dispatch({type: 'FETCH_CONTRAT_DATA_ERROR', errorMessage})
                throw new Error(errorMessage)
            }
        }
    )
}

export const getRisks0 = (contractNumber) => (dispatch, getState) => {
    const part = 'risks'
    let getRisksUrl = getState().aia.entities[contractNumber].risks.url

    dispatch({type: 'FETCH_CONTRAT_DATA_START', contractNumber, part})
    return aia.get(getRisksUrl).then(
        (response) => {
            if (response.data._count === 1) {
                let data = response.data._links.item
                data = !Array.isArray(data) ? [data] : data

                const contractUrl = data[0].href
                aia.get(contractUrl).then((response) => {
                    dispatch({type: 'FETCH_CONTRAT_DATA_SUCCESS', contractNumber, part, data: response.data})
                    return true
                })
            } else {
                const errorMessage = 'Contrat not found or too many : ' + response._count
                dispatch({type: 'FETCH_CONTRAT_DATA_ERROR', errorMessage})
                throw new Error(errorMessage)
            }
        }
    )
}

export const getRisks = (contractNumber) => (dispatch, getState) => {
    return fetchLink(contractNumber, 'risks') (dispatch, getState)
}


const fetchLink = (contractNumber, part) => (dispatch, getState) => {
    let getLinkUrl = getState().aia.entities[contractNumber][part].url
    dispatch({type: 'FETCH_CONTRAT_DATA_START', contractNumber, part})
    return aia.get(getLinkUrl).then(
        (response) => {
            let data = response.data._links.item
            data = !Array.isArray(data) ? [data] : data

            dispatch({type: 'FETCH_CONTRAT_DATA_SUCCESS', contractNumber, part, data})
            return true
        }
    )
}

