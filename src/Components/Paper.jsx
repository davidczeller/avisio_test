import React from 'react'

import { useStateProviderValue } from '../Services/StateProvider'

export default function Paper() {
  const [{data},] = useStateProviderValue();

  console.log('nagyon', {data})
   return (
    <div>
      
    </div>
  )
}
