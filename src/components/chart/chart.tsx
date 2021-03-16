import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { DxcToggleGroup } from '@dxc-technology/halstack-react';

const Chart = (props: { data: any; }) => {
    const { t } = useTranslation();
    const backgroundColor = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(160, 40, 70, 0.2)'
    ];
    const borderColor = [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(160, 40, 70, 1)'
    ]
    const toggleOption = [
        {
            label: t('_FUNDS'),
            value: 'funds',
        },
        {
            label: t('_FUND_TYPE'),
            value: 'fundType'
        },
        {
            label: t('_RISK_LEVEL'),
            value: 'riskLevel'
        }
    ]
    const [selected, setChartType] = useState('funds');

    const setLabel = (data: any, labelProp: any) => {
        let _data: string[] = [];
        const chartData = data;
        chartData.forEach((element: { [x: string]: string; }) => {
            if (typeof (labelProp) === 'string') {
                _data.push(element[labelProp]);
            } else {
                _data.push(element[labelProp[0]] + ' (' + element[labelProp[1]] + ')');
            }
        });
        return _data;
    }
    let labels = setLabel(props.data, ['_FUND_LABEL', '_ALLOCATION']);


    const prepareChartDataList = (data: any) => {
        let _data: any[] = [];
        const chartData = data;
        chartData.forEach((element: { [x: string]: any; }) => {
            _data.push(element['_ALLOCATION']);
        });
        return _data;
    }

    let dataSet = prepareChartDataList(props.data);

    const options = {
        legend: {
            position: 'left'
        },
        cutoutPercentage: 50
    }
    const [chartData, setChartData] = useState();

    useEffect(() => {
        buildChart(labels, dataSet);
    }, []);

    const buildChart = (labels: string[], dataSet: any[]) => {
        const data: any = {
            labels: labels,
            datasets: [
                {
                    label: t('_CHART_LABEL'),
                    data: dataSet,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 1,
                },
            ],
        }
        setChartData(data);
    }

    const rebuildChart = (value: React.SetStateAction<string>) => {
        setChartType(value);
        let _data = props.data;
        switch (value) {
            case 'funds':
                updateChart(_data, ['_FUND_LABEL', '_ALLOCATION']);
                break;
            case 'fundType':
                _data = processDataSetbyType('_FUND_TYPE', _data);
                updateChart(_data, ['_FUND_TYPE', '_ALLOCATION']);
                break;
            case 'riskLevel':
                _data = processDataSetbyType('_FUND_SRRI', _data);
                updateChart(_data, ['_FUND_SRRI', '_ALLOCATION']);
                break;
        }
    }

    const processDataSetbyType = (prop: string, data: any[]) => {
        let processedData: any[] = [];
        let _propVal = '';
        let _allocation = 0;
        data.forEach(item => {
            let _item: any = {};
            if (_propVal === item[prop]) {
                _allocation = _allocation + item['_ALLOCATION'];
                processedData.forEach(processedItem => {
                    if (processedItem[prop] === _propVal) {
                        processedItem['_ALLOCATION'] = _allocation;
                    }
                });
            } else {
                if (item[prop]) {
                    _propVal = item[prop];
                    _allocation = item['_ALLOCATION'];
                    _item = { _ALLOCATION: _allocation };
                    _item[prop] = _propVal;
                    processedData.push(_item);
                }
            }
        });
        return processedData;
    }

    const updateChart = (data: any, labelProp: string[]) => {
        const newData = data;
        labels = setLabel(newData, labelProp);
        dataSet = prepareChartDataList(newData);
        buildChart(labels, dataSet);
    }

    return (
        <>
            {chartData && (
                <>
                    <Doughnut data={chartData} options={options} redraw />

                    <DxcToggleGroup
                        options={toggleOption}
                        margin="medium"
                        value={selected}
                        onChange={rebuildChart}
                    ></DxcToggleGroup>
                </>
            )}

        </>
    )
}

export default Chart;
