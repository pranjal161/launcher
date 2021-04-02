import {AppConfig} from "../../config/appConfig";
import {aia} from "../../util/functions";

const searchContract = (contractNumber) => AppConfig.hostUrl.defaultHostUrl + 'contracts?contract:number=' + contractNumber + '&_num=1'

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
                    getActivities(contractNumber)(dispatch, getState)
                    getRoles(contractNumber)(dispatch, getState)
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

export const getRisks = (contractNumber) => (dispatch, getState) => fetchLink(contractNumber, 'risks')(dispatch, getState)
export const getActivities = (contractNumber) => (dispatch, getState) => fetchLink(contractNumber, 'activities')(dispatch, getState)
export const getRoles = (contractNumber) => (dispatch, getState) => fetchLink(contractNumber, 'roles')(dispatch, getState)



