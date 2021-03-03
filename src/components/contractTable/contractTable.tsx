import { get } from '../../util/api-caller';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { DxcTable } from '@dxc-technology/halstack-react';
const ContractTable = (props: { contractUrl: string; }) => {

    const { t } = useTranslation();
    const history = useHistory();
    const [contractData, setContractData] = React.useState([]);

    const useStyles = makeStyles(() => ({
        hover: {
            "&:hover": {
                backgroundColor: "#F7F7F7",
                cursor: "pointer"
            },
        },
    }));
    const classes = useStyles();


    function goToContract(item: any) {
        const contractNumber = item.summary['contract:number'];
        history.push('/contracts/' + contractNumber, { contractUrl: item.href });
    }
    function getData() {
        get(props.contractUrl).then(response => {
            if (response && response['_links']['item']) {
                if (!Array.isArray(response['_links']['item'])) {
                    response['_links']['item'] = [response['_links']['item']];
                }
                setContractData(response['_links']['item'])
            } else {
                setContractData([]);
            }
        });
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.contractUrl]);

    return (
        <>
            { contractData.length > 0 ? (
                <DxcTable>
                    <tr>
                        <th>{t('_CONTRACT_NUMBER')}</th>
                        <th>{t('_OWNER_NAME')}</th>
                        <th>{t('_RISK_DATA')}</th>
                    </tr>
                    {contractData.map((row) => (
                        <tr key={row['href']} onClick={() => goToContract(row)}
                            className={classes.hover}>
                            <td>{row['summary']['contract:number']}</td>
                            <td>{(row['summary']['person:display_id'])}</td>
                            <td>{row['summary']['membership:display_id']}</td>
                        </tr>
                    ))}
                </DxcTable>
            ) : (
                    <DxcTable>
                        <tr>
                            <th>{t('_CONTRACT_NUMBER')}</th>
                            <th>{t('_OWNER_NAME')}</th>
                            <th>{t('_RISK_DATA')}</th>
                        </tr>
                        <tr>
                            {t('_NO_RECORDS_FOUND')}
                        </tr>
                    </DxcTable>
                )
            }
        </>
    );

}

export default ContractTable;