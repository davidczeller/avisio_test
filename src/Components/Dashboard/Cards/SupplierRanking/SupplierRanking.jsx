import React from 'react'

import Paper from '../../../Common/Paper'
import BarChart from '../../../Charts/BarChart'

import { useStateProviderValue } from '../../../../Services/StateProvider'

export default function SupplierRanking() {
  const [{data}, dispatch] = useStateProviderValue()

  const getVolume = (orders) => (
    orders.reduce((acc, order) => {
      acc += (order.price * parseInt(order.quantity, 10))
      return acc
    }, 0)
  )

  const supplierData = ordersBySuppliers && ordersBySuppliers.map(supplier => ({
    supplier: supplier[0],
    volume: getVolume(supplier[1]),
    quantity: supplier[1].reduce((acc, order) => {
      acc += parseInt(order.quantity, 10)
      return acc
    }, 0),
  }))

  return (
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
  )
}
