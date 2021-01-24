import React, { useEffect } from 'react'


import Dashboard from './Components/Dashboard/Dashboard'
import './App.scss';

import { useStateProviderValue } from './Services/StateProvider'
import allActions from './Services/actions'
import ContentLoader from "react-content-loader"


export default function App() {
  const [{ data }, dispatch] = useStateProviderValue()

  useEffect(() => {
    const actions = allActions(dispatch)
    actions.loadData()
    actions.calculateOrdersByDay()
  }, [])

  useEffect(() => {
    dispatch({
      type: 'SET_LOADING',
      loading: data ? false : true,
    })
  }, [data])

  return (
    <div className="app">
      <Dashboard />
    </div>
  )
}
