import React, { useState, useEffect } from 'react'

import Paper from '../../../Common/Paper'
import './TopProducts.scss'

import { useStateProviderValue } from '../../../../Services/StateProvider'

export default function TopProducts() {
  const [{ data, sort_type },] = useStateProviderValue()
  const [ordersByProduct, setOrdersByProduct] = useState([])
  const [sortType, setSortType] = useState()

  useEffect(() => {
    orderByProduct()
  }, [data])

  useEffect(() => {
    sortByCost()
  }, [])

  const orderByProduct = () => data && data.reduce((acc, order) => {
    if (!acc[order.productName]) {
      acc[order.productName] = []
    }

    acc[order.productName].push(order)

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

  const sortByCost = () => ordersByProduct && ordersByProduct.sort(function (a, b) {
    return b.cost - a.cost
  });
  const sortByQuantity = () => ordersByProduct && ordersByProduct.sort(function (a, b) {
    return b.quantity - a.quantity
  });


  if (sort_type === 'cost') {
    sortByCost()
  } else {
    sortByQuantity()
  }



  return (
    <Paper
      flex='1'
      marginLeft
      isButton
      headerText='Top 3 Products Ordered'
      content={
        <>
          <div className="top3_container">
            <div className="row">
              <div className="top_products_title">Products</div>
              {ordersByProduct && ordersByProduct.slice(0, 3).map((item, idx) =>
                <p key={idx + item.product}>{item.product}</p>
              )}
            </div>
            <div className="row">
              <div className="top_products_title">Quantity</div>
              {ordersByProduct && ordersByProduct.slice(0, 3).map((item, idx) =>
                <p key={idx + item.quantity}>{item.quantity}</p>
              )}
            </div>
            <div className="row">
              <div className="top_products_title">Cost</div>
              {ordersByProduct && ordersByProduct.slice(0, 3).map((item, idx) =>
                <p key={idx + item.cost}>€ {item.cost}</p>
              )}
            </div>
          </div>
        </>
      }
    />
  )
}
