'use client'
import React from 'react'
import {CATEGORY} from "@/constants/Category";
import Image from 'next/image';
import { useQueryState } from 'nuqs';
const CategroyList = () => {
    const [category,setCategory] = useQueryState('category') ;
    const handleClick = (value: string) => {
      if(value===category){
        setCategory(null)
      }else{
        setCategory(value)
      }
    }
  return (
    Object.entries(CATEGORY).map(([key,value],index)=>
        <div  key={index} className='px-2 flex items-center gap-2 py-1 my-2 cursor-pointer' onClick={()=>handleClick(value)}>
          <Image src={"/icons/"+key+".svg"} alt={key} className='invert-colors' height={20} width={20}/>{value}
          </div>)
  )
}

export default CategroyList