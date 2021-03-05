import { DxcTable } from "@dxc-technology/halstack-react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ApplicationContext } from "../../context/applicationContext";
import { StyledHoverRow } from '../../styles/global-style';

const Table = (props: { url: string; columnId: any[] }) => {
    const applicationContext = useContext(ApplicationContext);
    const [tableData, setTableData] = useState([])
    const { t } = useTranslation();

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [applicationContext, props.url]);

    const getData = () => {
        axios.get(props.url, { headers: applicationContext.headers }).then(response => {
            if (response && response.data['_links']['item']) {
                if (!Array.isArray(response.data['_links']['item'])) {
                    response.data['_links']['item'] = [response.data['_links']['item']];
                }
                setTableData(response.data['_links']['item'])
            } else {
                setTableData([]);
            }
        });
    }

    return (
        <>
            {tableData.length > 0 ? (<DxcTable>

                {/* <th>{t('_CONTRACT_NUMBER')}</th>
                        <th>{t('_OWNER_NAME')}</th>
            <th>{t('_RISK_DATA')}</th> */}
                <tr>
                    {props.columnId.map(columnItem => (

                        <th>
                            {t(columnItem['label'])}
                        </th>
                    ))}
                </tr>

                {tableData.map((row) => (
                    <StyledHoverRow key={row['href']}>
                        {  props.columnId.map(columnItem => (
                            <td>
                                { typeof (columnItem.property) === "object" ? (
                                    columnItem.property.map((id: string) => (
                                        row['summary'][id]
                                    ))
                                    // property is an array then concatenate
                                ) : (row['summary'][columnItem.property])
                                }
                            </td>
                        ))}
                    </StyledHoverRow>
                ))}
            </DxcTable>) : (<DxcTable >
                <tr>
                    {props.columnId.map(columnItem => (
                        <th>
                            {t(columnItem['label'])}
                        </th>
                    ))}
                </tr>
                <tr>
                    <td colSpan={3}>{t('_NO_RECORDS_FOUND')}</td>
                </tr>
            </DxcTable>)
            }
        </>
    )

}
export default Table;