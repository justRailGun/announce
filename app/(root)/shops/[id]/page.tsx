import React from 'react'

const page = ({params} ) => {
    const {id} = params
  return (
    <div>Shop {id}</div>
  )
}

export default page