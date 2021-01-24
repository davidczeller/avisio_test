import React, { useState, useEffect } from 'react'

import Paper from '../../../BaseComponents/Paper'
import './TopProducts.scss'
import EuroIcon from '../../../../Static/Images/icons8-euro-50.png'
import QuantityIcon from '../../../../Static/Images/icons8-decline-50.png'

import { useStateProviderValue } from '../../../../Services/StateProvider'

export default function TopProducts() {
  const [{ data },] = useStateProviderValue()
  const [orderData, setOrderData] = useState()
  const [sortType, setSortType] = useState('cost')


  useEffect(() => {
    ordersByProduct()
  }, [data])


  const ordersByProduct = () => {
    const getQuantity = (orders) => {
      return orders.reduce((acc, order) => {
        acc += parseFloat(order.quantity, 10);
        return acc;
      }, 0);
    }

    const getCost = (orders) => {
      return orders.reduce((acc, order) => {
        acc += parseFloat(order.price, 10);
        return acc;
      }, 0)
    }

    const x = data && data.reduce((acc, order) => {
      if (!acc[order.productName]) {
        acc[order.productName] = []
      }
      acc[order.productName].push(order)
      return acc
    }, {});

    const ordersAndProducts = x && Object.entries(x)
      .map(data => ({ productName: data[0], orders: data[1] }))
      .map(data => ({
        product: data.productName,
        cost: getCost(data.orders),
        quantity: getQuantity(data.orders)
      }));
    setOrderData(ordersAndProducts)
  }

  const sortByCost = () => orderData && orderData.sort((a, b) => {
    return b.cost - a.cost
  });
  const sortByQuantity = () => orderData && orderData.sort((a, b) => {
    return b.quantity - a.quantity
  });


  if (sortType === 'cost') {
    sortByCost()
  } else {
    sortByQuantity()
  }

  const handleClick = () => sortType === 'cost' ? setSortType('quantity') : setSortType('cost')

  return (
    <Paper
      flex='1'
      marginLeft
      showButton
      buttonIcon={
        sortType === 'cost'
          ? EuroIcon
          : QuantityIcon
      }
      tooltip={
        sortType === 'cost'
          ? 'Sort By Quantity'
          : 'Sort By Cost'
      }
      handleClick={() => handleClick()}
      headerText='Top 3 Products Ordered'
      content={
        <>
          <div className="top3_container">
            <div className="row">
              <div className="top_products_title">Products</div>
              <div className='top_products_orders'>
                {orderData && orderData.slice(0, 3).map((item, idx) =>
                  <p key={idx + item.product}>{item.product}</p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="top_products_title">Quantity</div>
              <div className='top_products_orders'>
                {orderData && orderData.slice(0, 3).map((item, idx) =>
                  <p key={idx + item.quantity}>{item.quantity}</p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="top_products_title">Cost</div>
              <div className='top_products_orders'>
                {orderData && orderData.slice(0, 3).map((item, idx) =>
                  <p key={idx + item.cost}>€ {item.cost}</p>
                )}
              </div>
            </div>
          </div>
        </>
      }
    />
  )
}
