import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
const SheetMenu = ({trigger , isMenu =false} : {trigger: React.ReactNode,isMenu?: boolean}) => {
  return (
    <Sheet>
                <SheetTrigger className='flex items-center gap-2'>{trigger} {isMenu && "Open"}</SheetTrigger>
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
  )
}

export default SheetMenu