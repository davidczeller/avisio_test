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

  // useEffect replaces `componentDidMount` and others
  useEffect(() => {
    window.addEventListener('resize', updateWidth)

    // Removes listener on unmount
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
            domainPadding={{ y: 40 }}
            standalone={false}
            width={width}
          // height={450}
          >
            <VictoryAxis tickFormat={() => ''} />
            <VictoryBar
              horizontal
              barWidth={({ index }) => index * 2 + 8}
              style={{
                data: { fill: "#445FFF" }
              }}
              labelComponent={
                <VictoryLabel
                  dy={-20}
                  dx={0}
                  textAnchor="start"
                />
              }
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


