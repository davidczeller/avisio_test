import React, { useState, useEffect } from 'react'

import Paper from '../../../BaseComponents/Paper'
import Button from '../../../BaseComponents/Button'
import Dropdown from '../../../BaseComponents/Dropdown'
import LineChart from '../../../Charts/LineChart'

import { useStateProviderValue } from '../../../../Services/StateProvider'

export default function OrderVolume() {
  const [{ data, orders_by_day }, dispatch] = useStateProviderValue()
  const [ordersByDay, setOrdersByDay] = useState()
  const [selectedSupplier, setSelectedSupplier] = useState('all')
  const [selectedProductCategory1, setSelectedProductCategory1] = useState('all')
  const [selectedProductCategory2, setSelectedProductCategory2] = useState('all')

  const getFilteredVolume = (orders) => {
    const filteredOrders = orders.filter(o => o.supplier === selectedSupplier || selectedSupplier === 'all')
      .filter(o => o.productCategory1 === selectedProductCategory1 || selectedProductCategory1 === 'all')
      .filter(o => o.productCategory2 === selectedProductCategory2 || selectedProductCategory2 === 'all')

    const result = filteredOrders.reduce((acc, order) => {
      acc += (order.price * parseInt(order.quantity, 10))
      return acc
    }, 0)

    return result;
  }

  const orderByDay = orders_by_day && orders_by_day.map(order => (
    { dates: order[0], volumes: order[1] }
  )).map(x => ({
    date: x.dates,
    volume: getFilteredVolume(x.volumes)
  }))

  const SupplierLabelOptions = data && data.map(item => item.supplier)
    .filter((value, index, array) => (
      array.indexOf(value) === index
    ))
  const ProductCategory1LabelOptions = data && data.map(item => item.productCategory1)
    .filter((value, index, array) => (
      array.indexOf(value) === index
    ))
  const ProductCategory2LabelOptions = data && data.map(item => item.productCategory2)
    .filter((value, index, array) => (
      array.indexOf(value) === index
    ))

  return (
    <Paper
      flex='3'
      headerText='Order Volume'
      content={
        <>
          <Dropdown
            content={(
              <>
                <Button
                  className="menu-trigger"
                  marginTop='0px'
                  noPadding
                  icon={<img alt='menu-trigger' src="https://img.icons8.com/ios/24/ffffff/multiply.png" />}
                  tooltip='Set To Default'
                  tooltipDirection='bottom'
                  handleClick={() => {
                    setSelectedSupplier('all')
                    setSelectedProductCategory1('all')
                    setSelectedProductCategory2('all')
                  }}
                />
                <select name="supplier" id="1" onChange={(e) => setSelectedSupplier(e.currentTarget.value)}>
                  <option disabled>Suppliers</option>
                  <option value={'all'}>All</option>
                  {SupplierLabelOptions && SupplierLabelOptions.map(supplier =>
                    <option value={supplier}>{supplier}</option>
                  )}
                </select>
                <select name="productCategory1" id="2" onChange={(e) => setSelectedProductCategory1(e.currentTarget.value)}>
                  <option disabled>Product Category 1</option>
                  <option value={'all'}>All</option>
                  {ProductCategory1LabelOptions && ProductCategory1LabelOptions.map((productCategory1, idx) =>
                    <option>{productCategory1}</option>
                  )}
                </select>
                <select name="productCategory2" id="3" onChange={(e) => setSelectedProductCategory2(e.currentTarget.value)}>
                  <option disabled>Product Category 2</option>
                  <option value={'all'}>All</option>
                  {ProductCategory2LabelOptions && ProductCategory2LabelOptions.map((productCategory2, idx) =>
                    <option>
                      {productCategory2}
                    </option>
                  )}
                </select>
              </>
            )}
          />
          <LineChart
            title=''
            value={orderByDay}
          />
        </>
      }
    />
  )
}
