import React, { useEffect, useState } from 'react'

import Paper from '../../../BaseComponents/Paper'
import BarChart from '../../../Charts/BarChart'
import './SupplierRanking.scss'

import { useStateProviderValue } from '../../../../Services/StateProvider'

export default function SupplierRanking() {
  const [{ data }, dispatch] = useStateProviderValue()
  const [ordersBySuppliers, setOrdersBySuppliers] = useState()

  useEffect(() => {
    orderBySuppliers()
  }, [data])

  const getVolume = (orders) => (
    orders.reduce((acc, order) => {
      acc += (order.price * parseInt(order.quantity, 10))
      return acc
    }, 0)
  )

  const orderBySuppliers = () => data && data.reduce((acc, order) => {
    if (!acc[order.supplier]) {
      acc[order.supplier] = []
    }
    acc[order.supplier].push(order)

    setOrdersBySuppliers(Object.entries(acc))
    return acc
  }, {})

  const supplierData = ordersBySuppliers && ordersBySuppliers.map(supplier => ({ supplier: supplier[0], orders: supplier[1] }))
    .map(data => ({
      supplier: data.supplier,
      volume: getVolume(data.orders),
      quantity: data.orders.reduce((acc, order) => {
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
