import React from 'react'

import TopProducts from './Cards/TopProducts/TopProducts'
import Deliveries from './Cards/Deliveries/Deliveries'
import SupplierRanking from './Cards/SupplierRanking/SupplierRanking'

export default function Dashboard() {
  return (
    <div>
      <TopProducts />
      <Deliveries />
      <SupplierRanking />
    </div>
  )
}
