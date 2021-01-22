import React, { useEffect, useState } from 'react';

import ReactApexChart from 'react-apexcharts';
import * as V from 'victory';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryLabel } from 'victory';

import Paper from '../Common/Paper';




export default function LineChart(props) {
  const {
    title,
    labels,
    value,
  } = props;

  const [width, setWidth] = useState(window.innerWidth)
  
  const updateWidth = (ev) => {
    setWidth(ev.target.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', updateWidth)

    return () => {
      window.removeEventListener('resize', updateWidth)
    }
  }, [])

  return (
    <>
      <div className='chart_title' >
        {title}
      </div>
      {value && (
        <svg viewBox={"0 0" + " " + width + " " + "350"} preserveAspectRatio="none" width="100%" height="100%">
          <VictoryChart
            domainPadding={{ y: 20, x: 20 }}
            standalone={false}
            width={width}
          >
            <VictoryBar
              horizontal
              barWidth={({ index }) => index * 2 + 8}
              style={{
                data: {
                  fill: "#2F4EFE",
                  stroke: "#2F4EFE", strokeWidth: 8,
                },
                labels: {
                  fontSize: 15,
                }
              }}
              data={value.map(supplierData => ({
                label: supplierData.supplier,
                x: supplierData.supplier,
                y: supplierData.volume
                // || y: supplierData.quantity
              }))}
            />
          </VictoryChart>
        </svg>
      )}
    </>
  );
}


