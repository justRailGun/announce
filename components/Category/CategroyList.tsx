import React from 'react'
import Link from 'next/link'
import {CATEGORY} from "@/constants/Category";
import Image from 'next/image';

const CategroyList = () => {
    
  return (
    Object.entries(CATEGORY).map(([key,value],index)=>
        <Link href={`/$name`} key={index} className='px-2 flex items-center gap-2 py-1 my-2'>
          <Image src={"/icons/"+key+".svg"} alt={key} className='invert-colors' height={20} width={20}/>{value}
          </Link>)
  )
}

export default CategroyList