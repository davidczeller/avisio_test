import React, { useEffect, useState } from 'react'

import Paper from './Components/Common/Paper'
import LineChart from './Components/Charts/LineChart'
import './App.scss';

import json from './avisio.json'
import { useStateProviderValue } from './Services/StateProvider'


function App() {
  const [{ data }, dispatch] = useStateProviderValue()
  const [filteredOrders, setFilteredOrders] = useState({})

  const setData = () => {
    dispatch({
      type: 'SET_DATA',
      data: json,
    })
  }

  useEffect(() => {
    setData()
  }, [])

  console.log(data)

  const dailyOrders = () => data && data.reduce((acc, order) => {
    if (!acc[order.orderedOn]) {
      acc[order.orderedOn] = []
    }
    acc[order.orderedOn].push(order)

    setFilteredOrders(acc)
    return acc
  }, {})

  useEffect(() => {
    dailyOrders()
  }, [data])


  console.log(typeof filteredOrders)

  return (
    <div className="app">
      <div className="title">Dashboard</div>
      <div className="inner">
        <Paper
          headerText='Top 3 Products'
          content={
            <>
              <div>asdasdasasaasaas</div>
              <LineChart
                title='Order Volume'
                value={filteredOrders}
              />
            </>
          }
        />
      </div>
    </div>
  );
}

export default App;
