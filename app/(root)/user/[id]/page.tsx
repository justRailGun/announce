import React from 'react'
const page = async ({params} : {params : Promise<{ id : string }>}) => {
    const {id} = await params
    const res  = await fetch(`http://localhost:3000/api/user/${id}`) 
    const data = await res.json()
    console.log(data.data)
   
  return (
    <div>page</div>
  )
}

export default page