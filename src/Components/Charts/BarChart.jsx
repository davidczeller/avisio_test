import React from 'react';

import ReactApexChart from 'react-apexcharts';
import * as V from 'victory';
import { VictoryChart, VictoryBar } from 'victory';

import Paper from '../Common/Paper';




export default function LineChart(props) {
  const {
    title,
    labels,
    value,
  } = props;
  return (
    <>
      <div className='chart_title' >
        {title}
      </div>
      {value && (
        <VictoryChart>
          <VictoryBar
           barWidth={({ index }) => index * 2 + 8}
           style={{
             data: { fill: "#445FFF" }
           }}
            data={value.map(supplierData => ({
              x: supplierData.supplier,
              y: supplierData.volume
              // || y: supplierData.quantity
            }))}
          />
        </VictoryChart>
      )}
    </>
  );
}


