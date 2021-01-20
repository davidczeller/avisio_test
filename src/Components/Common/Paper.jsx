import React from 'react'

import './Paper.scss'

import { useStateProviderValue } from '../../Services/StateProvider'

export default function Paper({headerText, content}) {
  const [{data},] = useStateProviderValue();

  console.log(content)
   return (
    <div className='paper_container'>
      <div className="header">{headerText}</div>
      {content}
    </div>
  )
}
