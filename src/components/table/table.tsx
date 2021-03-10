import { DxcTable } from "@dxc-technology/halstack-react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ApplicationContext } from "../../context/applicationContext";
import { StyledHoverRow } from '../../styles/global-style';
import { getDescriptionValue } from "../../util/functions";

const Table = (props: { url: string; columnId: any[] }) => {
    const applicationContext = useContext(ApplicationContext);
    const [tableData, setTableData] = useState<undefined|any>();
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
                setTableData(response.data)
            }
        });
    }

    return (
        <>
            {tableData && tableData._links && tableData._links.item && tableData._links.item.length > 0 ? (<DxcTable>
                <tr>
                    {props.columnId.map(columnItem => (
                        <th key={columnItem['label']}>
                            {t(columnItem['label'])}
                        </th>
                    ))}
                </tr>

                {tableData._links.item.map((row: any) => (
                    <StyledHoverRow key={row['href']}>
                        {  props.columnId.map(columnItem => (
                            <td>
                                { typeof (columnItem.property) === "object" ? (
                                    columnItem.property.map((id: string) => (
                                        row['summary'][id]
                                    ))
                                    // property is an array then concatenate
                                ) : (getDescriptionValue(row['summary'][columnItem.property], columnItem.property, tableData))
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
                    <td colSpan={12}>{t('_NO_RECORDS_FOUND')}</td>
                </tr>
            </DxcTable>)
            }
        </>
    )

}
export default Table;