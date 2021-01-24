import React, { useEffect, useState } from 'react';

import ReactApexChart from 'react-apexcharts';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryLabel } from 'victory';

import Paper from '../BaseComponents/Paper';


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

  const getYValue = (supplierData, orderBy) => {
    if (orderBy === 'volume') {
      return supplierData.volume
    }
    return supplierData.quantity
  }

  return (
    <>
      <div className='chart_title' >
        {title}
      </div>
      {value && (
        <svg viewBox={"0 0" + " " + width + " " + "350"} preserveAspectRatio="none" width="100%" height="100%">
          <VictoryChart
            animate={{ duration: 800 }}
            domainPadding={{ y: 210, x: 20 }}
            standalone={false}
            width={width}
            height={300}
            padding={{ top: 20, bottom: 40, left: 0, right: 24 }}
          >
            <VictoryAxis fixLabelOverlap />
            <VictoryAxis dependentAxis />
            <VictoryBar
              horizontal
              barWidth={({ index }) => index * 2 + 8}
              style={{
                data: {
                  fill: "#2F4EFE",
                  stroke: "#2F4EFE", strokeWidth: 8,
                },
                labels: {
                  fontSize: 35,
                  fontWeight: 600,
                  fill: "#333"
                }
              }}
              labelComponent={
                <VictoryLabel dx={'-20%'} dy={-32} />
              }
              data={value.map(supplierData => ({
                label: supplierData.supplier,
                x: supplierData.supplier,
                y: supplierData.quantity
                // y: getYValue(supplierData, ordering) button to set this
              }))}
            />
          </VictoryChart>
        </svg>
      )}
    </>
  );
}


