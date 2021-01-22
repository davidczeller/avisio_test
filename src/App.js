import React, { useEffect, useState } from 'react'

import Paper from './Components/Common/Paper'
import LineChart from './Components/Charts/LineChart'
import BarChart from './Components/Charts/BarChart'
import Tooltip from './Components/Common/Tooltip'
import RadioButton from './Components/Common/RadioButton'
import Button from './Components/Common/Button'
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

  const [selectedSupplier, setSelectedSupplier] = useState('all')
  const [selectedProductCategory1, setSelectedProductCategory1] = useState('all')
  const [selectedProductCategory2, setSelectedProductCategory2] = useState('all')


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



  const radioButtonSupplierLabels = data && data.map(item => item.supplier)
    .filter((value, index, array) => (
      array.indexOf(value) === index
    ))
  const radioButtonProductCategory1Labels = data && data.map(item => item.productCategory1)
    .filter((value, index, array) => (
      array.indexOf(value) === index
    ))
  const radioButtonProductCategory2Labels = data && data.map(item => item.productCategory2)
    .filter((value, index, array) => (
      array.indexOf(value) === index
    ))

  //   const [selectedSupplier, setSelectedSupplier] = useState('all')
  // const [selectedProductCategory1, setSelectedProductCategory1] = useState('all')
  // const [selectedProductCategory2, setSelectedProductCategory2] = useState('all')
  const [active, setActive] = useState('All')

  console.log({ selectedSupplier })

  // console.log(data, radioButtonSupplierLabels, radioButtonProductCategory1Labels, radioButtonProductCategory2Labels)
  useEffect(() => {
    orderByDayData()
  }, [selectedSupplier, selectedProductCategory1, selectedProductCategory2])

  return (
    <div className="app">
      <div className="title">Dashboard</div>
      <Button title='Button' size='medium' tooltip='tooltip' tooltipDirection='bottom' />
      <div className="inner">
        <div className="left">
          <Paper
            flex='3'
            headerText='Order Volume'
            content={
              <>
                <div className="filter">
                  <button
                    // changed='All'
                    // id={0}
                    // label='All'
                    // value='All'
                    onClick={() => (setSelectedSupplier('all'))}
                  >All</button>
                  {radioButtonSupplierLabels && radioButtonSupplierLabels.map((supplier, idx) =>
                    <button
                      // changed={supplier}
                      // id={idx + 1}
                      // label={supplier}
                      // value={supplier}
                      onClick={() => (setSelectedSupplier(supplier))}
                    >{supplier}</button>
                  )}
                </div>
                <div className="filter">
                  <button
                    // changed='All'
                    // id={0}
                    // label='All'
                    // value='All'
                    onClick={() => (setSelectedProductCategory1('all'))}
                  >All</button>
                  {radioButtonProductCategory1Labels && radioButtonProductCategory1Labels.map((productCategory1, idx) =>
                    <button
                      // changed={supplier}
                      // id={idx + 1}
                      // label={supplier}
                      // value={supplier}
                      onClick={() => (setSelectedProductCategory1(productCategory1))}
                    >{productCategory1}</button>
                  )}
                </div>
                <div className="filter">
                  <button
                    // changed='All'
                    // id={0}
                    // label='All'
                    // value='All'
                    onClick={() => (setSelectedProductCategory2('all'))}
                  >All</button>
                  {radioButtonProductCategory2Labels && radioButtonProductCategory2Labels.map((productCategory2, idx) =>
                    <button
                      // changed={supplier}
                      // id={idx + 1}
                      // label={supplier}
                      // value={supplier}
                      onClick={() => (setSelectedProductCategory2(productCategory2))}
                    >{productCategory2}</button>
                  )}
                </div>
                <LineChart
                  title=''
                  value={orderByDay}
                />
              </>
            }
          />
          <Paper
            flex='1'
            marginLeft
            headerText='Supplier Ranking'
            content={
              <BarChart
                title=''
                value={supplierData}
              />
            }
          />
        </div>
        <div className="right">
          <Paper
            flex='3'
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
            flex='1'
            marginLeft
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
        </div>
      </div>
    </div>
  )
}

export default App;
