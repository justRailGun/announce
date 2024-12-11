'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useQueryState } from 'nuqs';
const CategroyList = () => {
    const [category,setCategory] = useQueryState('category') ;
    // const [SubCategory,setSubCategory] = useQueryState('Sub-Category') ;
    const [categoryList,setCategoryList] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{ 
      const getCategory = async ()=>{
        try{
          const response = await fetch(`/api/category`);
          const data = await response.json();
          setCategoryList(data.data)
        }
      
      catch(error){
        console.log(error)
      }
      finally{
        setLoading(false)
      }
    }
     getCategory()
    },[])
    if(loading){
      return <div>Loading...</div>
    }
    const handleClick = (value: string) => {
      if(value===category){
        setCategory(null)
      }else{
        setCategory(value)
      }
    }
  return (
    categoryList.map((name,index)=>
        <div key={index} className='px-2 flex items-center gap-2 py-1 my-2 cursor-pointer' onClick={()=>handleClick(name)}>
          <Image src={"/icons/.svg"} alt={name} className='invert-colors' height={20} width={20}/>{name}
          </div>)
  )
}

export default CategroyList