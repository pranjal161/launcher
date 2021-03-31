import React, { useContext, useEffect, useState } from "react";

import { ApplicationContext } from "context/applicationContext";
import { DxcTable } from "@dxc-technology/halstack-react";
import Paginator from '../paginator/paginator';
import { StyledHoverRow } from 'styles/global-style';
import axios from "axios";
import { getDescriptionValue } from "util/functions";
import { useTranslation } from "react-i18next";

const Table = (props: { url: string; columnId: any[]; showPaginator: boolean }) => {
    const applicationContext = useContext(ApplicationContext);
    const [tableData, setTableData] = useState<undefined | any>();
    const { t } = useTranslation();
    const [totalItems, changeTotalItems] = useState(0);
    const [showPaginator, setshowPaginator] = useState(true);

    useEffect(() => {
        getData();
    }, [applicationContext, props.url]);

    const getData = () => {
        axios.get(props.url, { headers: applicationContext.headers }).then((response) => {
            if (response && response.data['_links']['item']) {
                if (!Array.isArray(response.data['_links']['item'])) {
                    response.data['_links']['item'] = [response.data['_links']['item']];
                }
                const count = response && response.data && response.data._count;
                setTableData(response.data);
                changeTotalItems(count === '500+' ? 500 : count);
                setshowPaginator(props.showPaginator);
            }
        });
    };

    return (
        <>
            {tableData && tableData._links && tableData._links.item && tableData._links.item.length > 0 ? (
                <>
                    <DxcTable>
                        <tr>
                            {props.columnId.map((columnItem, index) => (
                                <th key={index}>{t(columnItem['label'])}</th>
                            ))}
                        </tr>
                        {tableData._links.item.map((row: any) => (
                            <StyledHoverRow key={row['href']}>
                                {props.columnId.map((columnItem) => (
                                    <td key={columnItem.type}>
                                        {typeof columnItem.property === 'object'
                                            ? columnItem.property.map((id: string) => row['summary'][id])
                                            : // property is an array then concatenate
                                            getDescriptionValue(
                                                row['summary'][columnItem.property],
                                                columnItem.property,
                                                tableData,
                                                columnItem.type,
                                            )}
                                    </td>
                                ))}
                            </StyledHoverRow>
                        ))}
                    </DxcTable>
                    {showPaginator && (
                        <Paginator totalItems={totalItems} itemsPerPage={5} data={tableData} handler={getData} />
                    )}
                </>
            ) : (
                <DxcTable>
                    <tr>
                        {props.columnId.map((columnItem) => (
                            <th key={columnItem['label']}>
                                {t(columnItem['label'])}
                            </th>
                        ))}
                    </tr>
                    <tr>
                        <td colSpan={12}>{t('_NO_RECORDS_FOUND')}</td>
                    </tr>
                </DxcTable>
            )}
        </>
    );
};
export default Table;
