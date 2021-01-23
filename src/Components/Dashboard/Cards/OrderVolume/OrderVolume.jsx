import React, { useState, useEffect } from 'react'

import Paper from '../../../Common/Paper'
import Button from '../../../Common/Button'

import { useStateProviderValue } from '../../../../Services/StateProvider'

export default function OrderVolume() {
  const [{
    data,
  }, dispatch] = useStateProviderValue()


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

  const setSelectedSupplier = (supplier) => {
    dispatch({
      type: 'SET_SELECTED_SUPPLIER',
      selected_supplier: supplier,
    })
  }

  const setSelectedProductCategory1 = (category1) => {
    dispatch({
      type: 'SET_SELECTED_PRODUCT_CATEGORY_1',
      selected_product_category_1: category1,
    })
  }

  const setSelectedProductCategory2 = (category2) => {
    dispatch({
      type: 'SET_SELECTED_PRODUCT_CATEGORY_2',
      selected_product_category_2: category2,
    })
  }

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
