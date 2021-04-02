import {AppConfig} from "../../config/appConfig";
import {aia} from "../../util/functions";

const searchContract = (contractNumber) => AppConfig.hostUrl.defaultHostUrl + 'contracts?contract:number=' + contractNumber + '&_num=1'

export const get = (contractNumber) => (dispatch, getState) => {
    let getContractUrl = searchContract(contractNumber)

    dispatch({type: 'GET_CONTRAT_PENDING', contractNumber})
    return aia.get(getContractUrl).then(
        (response) => {
            if (response.data._count === 1) {
                let result = response.data['_links']['item']
                result = !Array.isArray(result) ? [result] : result

                const contractUrl = result[0].href
                aia.get(contractUrl).then((response) => {
                    dispatch({type: 'GET_CONTRAT_SUCCESS', contractNumber, contract:response.data, url:contractUrl})
                    return true
                })
            } else {
                const errorMessage = 'Contrat not found or too many : ' + response._count
                dispatch({type: 'GET_CONTRAT_ERROR', errorMessage})
                throw new Error(errorMessage)
            }
        }
    )
}
