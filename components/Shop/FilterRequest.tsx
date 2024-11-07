import React from 'react'

const FilterRequest = async ({category} :{category : Array}) => {
  const array = await category 
  return (
    <div className='flex flex-col gap-2 w-[200px]'>
      <h3 className='text-dark200_light800 h3-bold'>Filters</h3>
      {
     array.map((category,index)=>{
       return <div key={index} className='flex items-center justify-between gap-4'>
        {category}
        <input type='checkbox' className='w-5 h-5 text-dark400_light700 rounded-md'/>
        </div>
     })
    }</div>
  )
}

export default FilterRequest