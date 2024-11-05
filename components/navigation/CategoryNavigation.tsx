import React from 'react'
import SheetMenu from '../SheetMenu';
import CategroyList from '../Category/CategroyList';
import Image from 'next/image';

const CategoryNavigation = () => {
  return (
    <section className='pt-24 max-xl:hidden py-2 background-dark100_light300 flex gap-2 base-medium divide-x-2 text-dark200_light800 divide-dark-200 dark:divide-light-800 mx-auto w-full'>
        <div className='flex items-center px-4'>
               <SheetMenu isMenu={true} trigger={<Image alt='hamburger' src="/icons/hamburger.svg" className='invert-colors' width={32} height={32} />} />
        </div>

        <CategroyList />
         </section>
  )
}

export default CategoryNavigation