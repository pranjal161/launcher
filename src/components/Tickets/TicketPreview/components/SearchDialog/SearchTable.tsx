import { DxcTable } from '@dxc-technology/halstack-react';
import React from 'react';

const SearchTable = (props: { tableData: Array<any>, tableStats: any, setSelectedData: (data: any) => void }) => {
    const { tableData, tableStats, setSelectedData } = props;

    return (<>
        <DxcTable>
            {tableStats && <tr>
                {
                    Object.keys(tableStats).map((header: any, i: number) => (
                        <th key={i}>{header}</th>
                    ))
                }
            </tr>}
            {tableData && tableData.length > 0 ? tableData.map((data: any, index: number) => (<tr key={index} onClick={() => setSelectedData(data)}>
                {
                    tableStats && Object.values(tableStats).map((value: any, _inx: number) => <td key={_inx}>{data[value] ? data[value] : data['summary'][value] ? data['summary'][value] : ''}</td>)
                }
            </tr>)) :
                <tr><td colSpan={3}>No Item</td></tr>
            }
        </DxcTable>
    </>);
};

export default SearchTable;