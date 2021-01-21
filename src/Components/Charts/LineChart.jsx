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

  // console.log(title, value)

  const keys = value && Object.keys(value)
  const values = value && Object.values(value)

  // const orders = value && value.length && value.map(orders => orders)
  // const order = orders && orders.map(order => order[1].length.toString())
  // console.log(orders && orders[0][0], orders && orders[0][1].length)

  // const a = values.map(item => item)
  // console.log(keys, values, values && values.map(item => item))

  return (
    <>
      <div className='chart_title' >
        {title}
      </div>
      {value && (
        <VictoryChart>
          <VictoryLine
            data={values && values.map(item => item.length)}
            // data accessor for x values
            // x={keys && keys.map(item => item)}
            // data accessor for y values
            // y={values && values.map(item => item.length)}
          />
        </VictoryChart>
      )}
    </>
  );
}


