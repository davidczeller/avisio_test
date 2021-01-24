import React, { useEffect, useState } from 'react'

import Paper from '../../../BaseComponents/Paper'
import BarChart from '../../../Charts/BarChart'
import './SupplierRanking.scss'
import EuroIcon from '../../../../Static/Images/icons8-euro-50.png'
import QuantityIcon from '../../../../Static/Images/icons8-decline-50.png'

import { useStateProviderValue } from '../../../../Services/StateProvider'

export default function SupplierRanking() {
  const [{ data, sort_type }, dispatch] = useStateProviderValue()
  const [ordersBySuppliers, setOrdersBySuppliers] = useState()
  const [sortType, setSortType] = useState('volume')

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

  const supplierData = ordersBySuppliers && ordersBySuppliers.map(supplier => (
    { supplier: supplier[0], orders: supplier[1] })
  ).map(data => ({
    supplier: data.supplier,
    volume: getVolume(data.orders),
    quantity: data.orders.reduce((acc, order) => {
      acc += parseInt(order.quantity, 10)
      return acc
    }, 0),
  }))

  const handleClick = () => sortType === 'volume' ? setSortType('quantity') : setSortType('volume')


  return (
    <Paper
      flex='1'
      marginLeft
      showButton
      buttonIcon={
        sortType === 'volume'
          ? EuroIcon
          : QuantityIcon
      }
      tooltip={
        sortType === 'volume'
          ? 'Sort By Quantity'
          : 'Sort By Volume'
      }
      handleClick={() => handleClick()}
      headerText='Supplier Ranking'
      content={
        <BarChart
          title=''
          value={supplierData}
          sortType={sortType}
        />
      }
    />
  )
}
