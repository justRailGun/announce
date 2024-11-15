'use client'
import React from 'react'
import {Input} from '../ui/input'
import {useQueryState} from "nuqs" ;
import Image from 'next/image';
// import { useEffect } from 'react';
const LocalSearch = () => {
  const [q,setQ] = useQueryState('q')
  const closeIcon = "/icons/close.svg";
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQ(value);
    
    if (!value) {
      setQ(null)
    }
  };
  const handleDelete = () => {
    setQ(null);
  };
  return (
    <div className='flex items-center relative min-w-[300px]'>
      <Input type="text" placeholder="Search..."
      value={q || ""}
      onChange={handleChange}
    className='dark:bg-light-900 text-black bg-gray-200 max-sm:hidden dark:placeholder:text-dark-100/60 border-2 w-full px-4 py-3 rounded-md focus:ring-0 focus:ring-offset-0' />
     {q && <Image src={closeIcon} onClick={()=>handleDelete()} width={16} height={16} alt="close" className='invert-colors absolute right-2 cursor-pointer' />}
    </div>
  )
}

export default LocalSearch