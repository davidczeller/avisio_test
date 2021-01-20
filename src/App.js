import React, { useEffect } from 'react'

import Paper from './Components/Paper'
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
      <Paper />
    </div>
  );
}

export default App;
