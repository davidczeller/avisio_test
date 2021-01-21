import React, { useEffect, useState } from 'react'

import Paper from './Components/Common/Paper'
import LineChart from './Components/Charts/LineChart'
import BarChart from './Components/Charts/BarChart'
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

  const getVolume = (orders) => (
    orders.reduce((acc, order) => {
      acc += (order.price * parseInt(order.quantity, 10))
      return acc
    }, 0)
  )

  // const selectedSupplier = 'Yum Food'
  // const selectedProductCategory1 = 'food'
  // const selectedProductCategory2 = 'bread'

  const selectedSupplier = 'all'
  const selectedProductCategory1 = 'all'
  const selectedProductCategory2 = 'all'


  const orderByDayData = () => data && data
    .filter(o => o.supplier === selectedSupplier || selectedSupplier === 'all')
    .filter(o => o.productCategory1 === selectedProductCategory1 || selectedProductCategory1 === 'all')
    .filter(o => o.productCategory2 === selectedProductCategory2 || selectedProductCategory2 === 'all')
    .reduce((acc, order) => {
      if (!acc[order.orderedOn]) {
        acc[order.orderedOn] = []
      }
      acc[order.orderedOn].push(order)

      setOrdersByDay(Object.entries(acc))
      return acc
    }, {})
  // .map(x => (x
  // {
  //   date: x[0],
  //   volume: getVolume(x[1])
  // }
  // ))

  //every day volume
  const orderByDay = ordersByDay && ordersByDay.map(x => ({
    date: x[0],
    volume: getVolume(x[1])
  }))

  console.log(orderByDay && orderByDay)


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
    suppliers: item[1].map(item => item.supplier).reduce((acc, supplier) => {
      if (!acc[supplier]) {
        acc[supplier] = 0
      }
      acc[supplier]++

      return acc
    }, {})
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

  const supplierData = ordersBySuppliers && ordersBySuppliers.map(supplier => ({
    supplier: supplier[0],
    volume: getVolume(supplier[1]),
    quantity: supplier[1].reduce((acc, order) => {
      acc += parseInt(order.quantity, 10)
      return acc
    }, 0),
  }))

  //sort


  console.log({ ordersByDay, ordersBySuppliers, ordersByDeliveryDate, deliveryDates, supplierData })

  useEffect(() => {
    products()
    orderByDayData()
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
                    <p key={item.cost}>{item.product}</p>
                  )}
                </div>
                <div className="row_title">
                  <div className="title">Quantity</div>
                  {ordersByProduct && ordersByProduct.slice(0, 3).map(item =>
                    <p key={item.cost}>{item.quantity}</p>
                  )}
                </div>
                <div className="row_title">
                  <div className="title">Cost</div>
                  {ordersByProduct && ordersByProduct.slice(0, 3).map(item =>
                    <p key={item.cost}>€ {item.cost}</p>
                  )}
                </div>
              </div>

            </>
          }
        />
        <Paper
          headerText='Deliveries'
          content={
            deliveryDates && deliveryDates.map(delivery => (
              <>
                <div>{delivery.date}</div>
                {Object.entries(delivery.suppliers).map(kvp => (
                  <div key={`${delivery.date}_${kvp[0]}`}>{kvp[0]} {kvp[1]}</div>
                ))}
              </>
            ))
          }
        />
        <Paper
          headerText='Order Volume'
          content={
            <LineChart
              title=''
              value={orderByDay}
            />
          }
        />
        <Paper
          headerText='Supplier Ranking'
          content={
            <BarChart
              title=''
              value={supplierData}
            />
          }
        />
      </div>
    </div>
  )
}

export default App;
