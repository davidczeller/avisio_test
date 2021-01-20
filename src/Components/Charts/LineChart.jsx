import React from 'react';

import ReactApexChart from 'react-apexcharts';

import Paper from '../Common/Paper';


export default function LineChart(props) {
  const {
    title,
    labels,
    value,
  } = props;

  console.log(title, value)

  return (
    <>
      <div className='chart_title' >
        {title}
      </div>
      <ReactApexChart
        className='lineChart'
        series={value}
        options={{
          dataLabels: {
            enabled: false,
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              type: 'diagonal2',
              gradientToColors: ['#87D4F9'],
              stops: [0, 100],
            },
          },
          labels,
          legend: {
            position: 'bottom',
            height: 'fit-content',
          },
        }}
        type="line"
        height="80%"
        width="100%" ss
      />
    </>
  );
}
