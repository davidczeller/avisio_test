import React, { useEffect, useState } from 'react';

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
        <svg viewBox={"0 0" + " " + width + " " + "350"} preserveAspectRatio="none" width="100%">
          <VictoryChart
            animate={{ duration: 2000}}
            domainPadding={{ x: 0 }}
            standalone={false}
            width={width}
            height={350}
          >
            <VictoryLine
              style={{
                data: { stroke: "#445FFF" }
              }}
              // height={100}
              // responsive
              data={value.map(supplierData => ({
                x: supplierData.date,
                y: supplierData.volume
              }))}
            />
          </VictoryChart>
        </svg>
      )}
    </>
  );
}


