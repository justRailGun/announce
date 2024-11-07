import React from 'react'
import FilterRequest from '@/components/Shop/FilterRequest'
const ShopFeed = async ({category}) => {
    const filter = await category ;
  return (
    <div>
        <FilterRequest category={filter as Array} />
    </div>
  )
}

export default ShopFeed