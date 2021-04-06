import {AppConfig} from "../../config/appConfig";
import {aia} from "../../util/functions";

const searchContract = (contractNumber) => AppConfig.hostUrl.defaultHostUrl + 'contracts?contract:number=' + contractNumber + '&_num=1'

const fetchLink = (contractNumber, part) => async (dispatch, getState) => {
    console.log('getState().aia.entities[contractNumber]', getState().aia.entities[contractNumber])
    let getLinkUrl = getState().aia.entities[contractNumber][part].url
    dispatch({type: 'FETCH_CONTRAT_DATA_START', contractNumber, part, timestamp: Date.now()})

    const response = await aia.get(getLinkUrl)
    let data = response.data._links.item
    data = !Array.isArray(data) ? [data] : data

    dispatch({type: 'FETCH_CONTRAT_DATA_SUCCESS', contractNumber, part, data, timestamp: Date.now()})
    return true
}

export const get = (contractNumber) => async (dispatch, getState) => {
    const part = 'data'
    let getContractUrl = searchContract(contractNumber)

    dispatch({type: 'FETCH_CONTRAT_DATA_START', contractNumber, part, timestamp: Date.now()})
    await aia.get(getContractUrl).then(
        async (response) => {
            if (response.data._count === 1) {
                let data = response.data._links.item
                data = !Array.isArray(data) ? [data] : data

                const contractUrl = data[0].href

                await aia.get(contractUrl).then((response) => {
                    dispatch({
                        type: 'FETCH_CONTRAT_DATA_SUCCESS',
                        contractNumber,
                        part,
                        data: response.data,
                        url: contractUrl,
                        timestamp: Date.now()
                    })
/*
                    getRisks(contractNumber)(dispatch, getState)
                    getRoles(contractNumber)(dispatch, getState)
                    getActivities(contractNumber)(dispatch, getState)
*/
                    return true
                })
            } else {
                const errorMessage = 'Contrat not found or too many : ' + response._count
                dispatch({type: 'FETCH_CONTRAT_DATA_ERROR', errorMessage, timestamp: Date.now()})
                throw new Error(errorMessage)
            }
        }
    )
}


export const getRisks = (contractNumber) => (dispatch, getState) => fetchLink(contractNumber, 'risks')(dispatch, getState)
export const getActivities = (contractNumber) => (dispatch, getState) => fetchLink(contractNumber, 'activities')(dispatch, getState)
export const getRoles = (contractNumber) => (dispatch, getState) => fetchLink(contractNumber, 'roles')(dispatch, getState)



