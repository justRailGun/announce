import React from 'react'
import {ModeToggle} from "@/components/Theme"
import {Input} from "@/components/ui/input"
const Navbar = () => {
  return (
    <nav
    className='w-full flex fixed items-center justify-between background-light900_dark300 p-6  dark:shadow-none'
    >
        <h1 className='h1-bold dark:text-light-800 text-dark-100'>
            Saha<span className='text-primary-500'> A</span> 
        </h1>
        <div className='flex items-center relative min-w-[300px]'>
            <Input type="text" placeholder="Search..." 
            className=' dark:bg-light-900 bg-gray-200 dark:placeholder:text-dark-100/60 border-2 w-full px-4 py-3 rounded-md focus:ring-0 focus:ring-offset-0' />
        </div>
        <div className='flex items-center justify-center gap-2'> 

            <ModeToggle />
            </div>
    </nav>
  )
}

export default Navbar