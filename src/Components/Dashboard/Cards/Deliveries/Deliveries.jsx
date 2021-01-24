import React, { useState, useEffect } from 'react'

import Paper from '../../../BaseComponents/Paper'
import './Deliveries.scss'

import { useStateProviderValue } from '../../../../Services/StateProvider'

export default () => {
  const [{ data }, dispatch] = useStateProviderValue()
  const [ordersByDeliveryDate, setOrdersByDeliveryDate] = useState()

  useEffect(() => {
    orderByDeliveryDate()
  }, [data])

  const orderByDeliveryDate = () => data && data.reduce((acc, order) => {
    if (!acc[order.deliveryDate]) {
      acc[order.deliveryDate] = []
    }
    acc[order.deliveryDate].push(order)

    setOrdersByDeliveryDate(Object.entries(acc))
    return acc
  }, {})

  const deliveryDates = ordersByDeliveryDate && ordersByDeliveryDate.map(order => (
    { date: order[0], suppliers: order[1] }
  )).map(item => ({
    date: item.date,
    suppliers: item.suppliers.map(item => item.supplier).reduce((acc, supplier) => {
      if (!acc[supplier]) {
        acc[supplier] = 0
      }
      acc[supplier]++

      return acc
    }, {})
  }))

  return (
    <Paper
      flex='3'
      headerText='Deliveries'
      content={
        <div className="delivery_container">
          {deliveryDates && deliveryDates.map((delivery, idx) => (
            <div key={idx + 1} className='delivery_column'>
              <div className='delivery_header'>{delivery.date}</div>
              {Object.entries(delivery.suppliers).map(kvp => (
                <div className='deliveries' key={`${delivery.date}_${kvp[0]}`}>
                  <p className='delivery_supplier'>{kvp[0]}</p>
                  <p>{kvp[1]}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      }
    />
  )
}
