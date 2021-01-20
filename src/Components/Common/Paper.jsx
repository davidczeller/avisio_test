import React from 'react'

import './Paper.scss'

import { useStateProviderValue } from '../../Services/StateProvider'

export default function Paper({headerText}) {
  const [{data},] = useStateProviderValue();

  console.log('nagyon', {data})
   return (
    <div className='paper_container'>
      <div className="header">{headerText}</div>
      
    </div>
  )
}
