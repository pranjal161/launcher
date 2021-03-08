import { DxcTable } from "@dxc-technology/halstack-react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ApplicationContext } from "../../context/applicationContext";
import { StyledHoverRow } from '../../styles/global-style';

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

    const mergeOptions = (options: any) => {
        let mergedOptions = {};
        if (options.oneOf.length > 1) {
            for (const item of options.oneOf) {
                mergedOptions = { ...mergedOptions, ...item };
            }
        }
        return mergedOptions;
    }

    const getPropertyOptions = (id: string) => {
        let options;
        if (tableData._options && tableData._options.properties &&
            tableData._options.properties._links &&
            tableData._options.properties._links.properties &&
            tableData._options.properties._links.properties.item &&
            tableData._options.properties._links.properties.item.properties &&
            tableData._options.properties._links.properties.item.properties.summary &&
            tableData._options.properties._links.properties.item.properties.summary.properties) {
            options =
                tableData._options.properties._links.properties.item.properties.summary.properties;
            options = options && options.oneOf ? mergeOptions(options) : options;
            return options;
        }

    }

    const getDescriptionValue = (value: any, id: string) => {
        const options = getPropertyOptions(id);
        if (options && options[id] && options[id].oneOf) {
            for (const item of options[id].oneOf) {
                if (item.enum[0] === value) {
                    value = item.title;
                }
            }
        }
        return value ? value : '';
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
                                ) : (getDescriptionValue(row['summary'][columnItem.property], columnItem.property))
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