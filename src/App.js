import React, { useEffect } from 'react'

import Paper from './Components/Common/Paper'
import './App.scss';

import data from './avisio.json'
import { useStateProviderValue } from './Services/StateProvider'


function App() {
  const [, dispatch] = useStateProviderValue()

  const setData = () => {
    dispatch({
      type: 'SET_DATA',
      data: data,
    })
  }

  useEffect(() => {
    setData()
  }, [])


  return (
    <div className="app">
    <div className="title">Dashboard</div>
      <div className="inner">
        <Paper headerText='Top 3 Products' />
      </div>
    </div>
  );
}

export default App;
