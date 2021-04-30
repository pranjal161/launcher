import React, { useContext, useEffect, useState } from 'react';

import { ApplicationContext } from 'context/applicationContext';
import { DxcSelect } from '@dxc-technology/halstack-react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const ContractStates = (props: { stateUrl: string, onHistoryChange?: any }) => {
    const { stateUrl, onHistoryChange } = props;
    const applicationContext = useContext(ApplicationContext);
    const { t } = useTranslation();
    const [historySelect, changeHistory] = useState('');
    const [historySelectOptions, setHistoryOptions] = useState([]);

    useEffect(() => {
        populateHistorySelect(stateUrl);
    }, []);

    const populateHistorySelect = (stateUrl: string) => {
        if (stateUrl) {
            axios.get(stateUrl, { headers: applicationContext.headers }).then((res: any) => {
                const response: any = res && res['data'];
                if (response && response['_links'] && response['_links']['item']) {
                    const items = Array.isArray(response['_links']['item'])
                        ? response['_links']['item']
                        : [response['_links']['item']];
                    const historyOptions: any = [];
                    const version = t('_STATE_VERSION');
                    const fromLabel = t('_FROM_VERSION');
                    const toLabel = t('_TO_VERSION');
                    items.forEach((element: any) => {
                        const label = `${version} ${element.summary['state_number']}${fromLabel}${element.summary['start_date']}${toLabel}${element.summary['end_date']}`;
                        const value = element.href;
                        const data = {
                            value: value,
                            label: label,
                        };

                        historyOptions.push(data);
                    });
                    setHistoryOptions(historyOptions);
                }
            });
        }
    };

    const updateState = (newValue: string) => {
        changeHistory(newValue);
        onHistoryChange(newValue)
    };


    return (
        <>
            {historySelectOptions.length > 0 &&
                <DxcSelect
                    options={historySelectOptions}
                    label={t('_HISTORY')}
                    onChange={updateState}
                    value={historySelect}
                ></DxcSelect>
            }

        </>
    )
}

export default ContractStates