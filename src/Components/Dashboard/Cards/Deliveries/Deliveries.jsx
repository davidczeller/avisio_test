import React from 'react'

import Paper from '../../../Common/Paper'

import { useStateProviderValue } from '../../../../Services/StateProvider'

export default () => {
  const [{data}, dispatch] = useStateProviderValue()
  const [ordersByDeliveryDate, setOrdersByDeliveryDate] = useState()

  const orderByDeliveryDate = () => data && data.reduce((acc, order) => {
    if (!acc[order.deliveryDate]) {
      acc[order.deliveryDate] = []
    }
    acc[order.deliveryDate].push(order)

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

  return (
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
  )
}
