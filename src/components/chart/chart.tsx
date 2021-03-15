import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

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


    const prepareChartDataList = (data: any) => {
        let _data: any[] = [];
        const chartData = data;
        chartData.forEach((element: { [x: string]: any; }) => {
            _data.push(element['_ALLOCATION']);
        });
        return _data;
    }

    const options = {
        legend: {
            position: 'left'
        },
        cutoutPercentage: 50
    }
    const data = {
        labels: setLabel(props.data, ['_FUND_LABEL', '_ALLOCATION']),
        datasets: [
            {
                label: t('_CHART_LABEL'),
                data: prepareChartDataList(props.data),
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1,
            },
        ],
    }

    return (
        <>
            <Doughnut data={data} options={options} />
        </>
    )
}

export default Chart;
