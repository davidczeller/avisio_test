import React, { useEffect } from 'react'


import Dashboard from './Components/Dashboard/Dashboard'
import './App.scss';

import { useStateProviderValue } from './Services/StateProvider'
import allActions from './Services/actions'


export default function App() {
  const [{}, dispatch] = useStateProviderValue()

  useEffect(() => {
    const actions = allActions(dispatch)
    actions.loadData()
    actions.calculateOrdersByDay()
  }, [])

  return (
    <div className="app">
      <Dashboard />
    </div>
  )
}

//common => baseComponents || uiElements
//icons as static instead of links
//isButton => showButton
//naming ...[0], ..[1] based on supplierranking 