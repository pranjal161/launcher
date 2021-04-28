import React, { useContext, useEffect, useState } from 'react';

import { ApplicationContext } from 'context/applicationContext';
import { DxcSelect } from '@dxc-technology/halstack-react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const ContractStates = (props: { onHistoryChange: any }) => {
    const { onHistoryChange } = props;
    const applicationContext = useContext(ApplicationContext);
    const { t } = useTranslation();
    const [historySelect, changeHistory] = useState('');
    const [historySelectOptions, setHistoryOptions] = useState([]);
    // const [stateResponse, setStateRes] = useState();

    // console.log('contractResponse -->', contractResponse);

    useEffect(() => {
        populateHistorySelect();
    }, []);

    const updateState = (newValue: string) => {
        console.log('newValue -->', newValue);
        // changeHistory(newValue);
        // onHistoryChange(newValue);
    };

    const populateHistorySelect = () => {
        // let stateUrl = 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6F7gS/states';
        // let contractUrl = contractResponse._links['self'].href;
        // if (contractResponse && contractResponse['_links'] && contractResponse['_links']['cscaia:states']) {
        //     stateUrl = contractResponse._links['cscaia:states'].href;
        // } else if (contractUrl.indexOf('/states') >= 0) {
        //     stateUrl = contractUrl.substring(0, contractUrl.lastIndexOf('/'));
        // }
        // if (stateUrl) {
            // axios.get(stateUrl, { headers: applicationContext.headers }).then((res: any) => {
            //     const response: any = res && res['data'];
            //     console.log('res -->', response);
                // setStateRes(response);
                // if (response && response['_links'] && response['_links']['item']) {
                //     const items = Array.isArray(response['_links']['item'])
                //         ? response['_links']['item']
                //         : [response['_links']['item']];
                //     const historyOptions: any = [];
                //     const version = t('_STATE_VERSION');
                //     const fromLabel = t('_FROM_VERSION');
                //     const toLabel = t('_TO_VERSION');

                //     items.forEach((element) => {
                //         const label = `${version} ${element.summary['state_number']}${fromLabel}${element.summary['start_date']}${toLabel}${element.summary['end_date']}`;
                //         const value = element.href;
                //         const data = {
                //             value: value,
                //             label: label,
                //         };

                //         historyOptions.push(data);
                //     });
                //     setHistoryOptions(historyOptions);
                // }
            // });
        // }
    };


    return (
        <>
            <DxcSelect
                options={historySelectOptions}
                onChange={updateState}
                label={t('_HISTORY')}
                value={historySelect}
            ></DxcSelect>

        </>
    )
}

export default ContractStates
