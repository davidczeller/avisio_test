import React from 'react';

import ReactApexChart from 'react-apexcharts';
import * as V from 'victory';
import { VictoryChart, VictoryLine } from 'victory';

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
          <VictoryLine
          style={{
            data: { stroke: "#445FFF" }
          }}
            data={value.map(supplierData => ({
              x: supplierData.date,
              y: supplierData.volume
            }))}
          />
        </VictoryChart>
      )}
    </>
  );
}


