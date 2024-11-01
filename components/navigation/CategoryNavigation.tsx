import React from 'react'
import {CATEGORY} from "@/constants/Category";
import Link from 'next/link'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  
const CategoryNavigation = () => {

  return (
    <section className='pt-24 bg-dark-200 flex gap-2 flex-wrap base-medium divide-x-2 text-dark200_light800 divide-light-800 mx-auto w-full'>
        <div className='flex items-center px-4'>
            <Sheet>
                <SheetTrigger>Open</SheetTrigger>
                <SheetContent side={'left'}>
                    <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>    
        </div>

        {Object.values(CATEGORY).map((name,index)=>
         <Link href={`/$name`} key={index} className='px-2 py-1 my-2'>{name}</Link>)}
         </section>
  )
}

export default CategoryNavigation