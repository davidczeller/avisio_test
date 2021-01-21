import React, { useEffect, useState } from 'react'

import Paper from './Components/Common/Paper'
import LineChart from './Components/Charts/LineChart'
import Tooltip from './Components/Common/Tooltip'
import './App.scss';

import json from './avisio.json'
import { useStateProviderValue } from './Services/StateProvider'


function App() {
  const [{ data, sortType }, dispatch] = useStateProviderValue()
  const [ordersByDay, setOrdersByDay] = useState()
  const [ordersByProduct, setOrdersByProduct] = useState()
  const [ordersBySuppliers, setOrdersBySuppliers] = useState()
  const [ordersByDeliveryDate, setOrdersByDeliveryDate] = useState()

  const setData = () => {
    dispatch({
      type: 'SET_DATA',
      data: json,
    })
  }

  useEffect(() => {
    setData()
  }, [])

  const orderByDay = () => data && data.reduce((acc, order) => {
    if (!acc[order.orderedOn]) {
      acc[order.orderedOn] = []
    }
    acc[order.orderedOn].push(order)

    Object.keys(acc)

    Object.values(acc)

    setOrdersByDay(Object.entries(acc))
    return acc
  }, {})

  const orderByProduct = () => data && data.reduce((acc, order) => {
    if (!acc[order.productName]) {
      acc[order.productName] = []
    }
    acc[order.productName].push(order)

    Object.keys(acc)

    Object.values(acc)

    const x = Object.values(acc)
    const y = x.map(item => item)

    const q = y.map((item, idx) => (
      (item.length > 1) ? (
        item.map(i => (
          parseFloat(i.quantity)
        ))
      ) : (
          parseFloat(item[0].quantity)
        )
    ))

    const c = q.map(item => (
      typeof item !== 'number' ? (
        item.reduce(function (a, b) {
          return a + b;
        }, 0)
      ) : (
          item
        )
    ))

    const z = y.map((item, idx) => ({
      product: item[0].productName,
      cost: item[0].price * item.length,
      quantity: c[idx]
    }))

    setOrdersByProduct(z)
    return acc
  }, {})

  const orderBySuppliers = () => data && data.reduce((acc, order) => {
    if (!acc[order.supplier]) {
      acc[order.supplier] = []
    }
    acc[order.supplier].push(order)

    Object.keys(acc)

    Object.values(acc)

    setOrdersBySuppliers(Object.entries(acc))
    return acc
  }, {})

  const orderByDeliveryDate = () => data && data.reduce((acc, order) => {
    if (!acc[order.deliveryDate]) {
      acc[order.deliveryDate] = []
    }
    acc[order.deliveryDate].push(order)

    Object.keys(acc)

    Object.values(acc)

    setOrdersByDeliveryDate(Object.entries(acc))
    return acc
  }, {})

  const deliveryDates = ordersByDeliveryDate && ordersByDeliveryDate.map(item => ({
    date: item[0],
    suppliers: item[1].map(item => item.supplier)
  }))

  const [asd, setAsd] = useState()

  const products = () => data && data.reduce((acc, order) => {
    if (!acc[order.productName]) {
      acc[order.productName] = []
    }
    acc[order.productName].push(order)

    Object.keys(acc)
    Object.values(acc)
    Object.entries(acc)

    setAsd(acc)
    return acc
  }, {})

  console.log({ ordersBySuppliers, ordersByDeliveryDate, deliveryDates })

  useEffect(() => {
    products()
    orderByDay()
    orderByProduct()
    orderBySuppliers()
    orderByDeliveryDate()
  }, [data])

  const sortByCost = () => ordersByProduct && ordersByProduct.sort(function (a, b) {
    return b.cost - a.cost
  });
  const sortByQuantity = () => ordersByProduct && ordersByProduct.sort(function (a, b) {
    return b.quantity - a.quantity
  });

  if (sortType === 'cost') {
    sortByCost()
  } else {
    sortByQuantity()
  }

  useEffect(() => {
    sortByCost()
  }, [])

  return (
    <div className="app">
      <div className="title">Dashboard</div>
      <div className="inner">
        <Paper
          isButton
          headerText='Top 3 Products Ordered'
          content={
            <>
              <div className="top3_container">
                <div className="row_title">
                  <div className="title">Products</div>
                  {ordersByProduct && ordersByProduct.slice(0, 3).map(item =>
                    <p>{item.product}</p>
                  )}
                </div>
                <div className="row_title">
                  <div className="title">Quantity</div>
                  {ordersByProduct && ordersByProduct.slice(0, 3).map(item =>
                    <p>{item.quantity}</p>
                  )}
                </div>
                <div className="row_title">
                  <div className="title">Cost</div>
                  {ordersByProduct && ordersByProduct.slice(0, 3).map(item =>
                    <p>€ {item.cost}</p>
                  )}
                </div>
              </div>

            </>
          }
        />
        <Paper
          headerText='Order Volume'
          content={
            <LineChart
              title=''
              value={
                asd
              }
            />
          }
        />
      </div>
    </div>
  )
}

export default App;
