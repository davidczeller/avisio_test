import React, {
  useEffect
} from 'react'

import {
  useStateProviderValue
} from './StateProvider'

import json from '../avisio.json'

export default function actions(dispatch) {
  return {
    loadData: () => {
      dispatch({
        type: 'SET_DATA',
        data: json,
      })
    },
    calculateOrdersByDay: () => {
      const ordersByDay = json
        .reduce((acc, order) => {
          if (!acc[order.orderedOn]) {
            acc[order.orderedOn] = []
          }
          acc[order.orderedOn].push(order)

          return acc
        }, {})

      dispatch({
        type: 'SET_ORDERS_BY_DAY',
        orders_by_day: Object.entries(ordersByDay),
      })
    }
  }
}
