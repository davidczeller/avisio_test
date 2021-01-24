import React, { useEffect, useState } from 'react';

import ReactApexChart from 'react-apexcharts';
import * as V from 'victory';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory';

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
  
  return (
    <>
      <div className='chart_title' >
        {title}
      </div>
      {value && (
        <svg viewBox={"0 0" + " " + width + " " + "350"} preserveAspectRatio="none" width="100%">
          <VictoryChart
            animate={{ duration: 800 }}
            domainPadding={{ x: 0 }}
            standalone={false}
            width={width}
            height={380}
            padding={{ top: 20, bottom: 64, left: 40, right: 24 }}
          >
            <VictoryAxis fixLabelOverlap />
            <VictoryAxis dependentAxis />
            <VictoryLine
              style={{
                data: {
                  stroke: "#2F4EFE", strokeWidth: 5
                },
              }}
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


