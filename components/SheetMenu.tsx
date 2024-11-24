'use client'
import React, { useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { arrayCategory, categoryItems } from '@/constants/Category'
import {  useSession, signOut } from 'next-auth/react'
import { Button } from './ui/button'
import Link from 'next/link'
import { ROUTES } from '@/constants/route'
import { Activity,  Building,  ChevronDown, LayoutDashboard, LogIn, LogOut, Save, ShoppingCart } from 'lucide-react'
const SheetMenu = ({trigger , isMenu =false} : {trigger: React.ReactNode,isMenu?: boolean}) => {
  const {data:session} = useSession() ;
  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }
  const SidebarItem = ({ icon: Icon, children, badge }: { icon: React.ElementType, children: React.ReactNode, badge?: number }) => (
    <Button
      variant="ghost"
      className="w-full justify-start text-lg text-dark100_light900 "
    >
      <Icon className="mr-2 h-4 w-4" />
      {children}
      {badge && (
        <span className="ml-auto rounded bg-zinc-300 dark:bg-zinc-800 px-1.5 py-0.5 text-xs">
          {badge}
        </span>
      )}
    </Button>
  )
  const SidebarSection = ({ title, icon: Icon, items }: { title: string, icon: React.ElementType, items: { title: string, icon: React.ElementType }[] }) => (
    <div className=''>
      <Button
        variant="ghost"
        className="w-full text-lg justify-start text-dark100_light900 hover:bg-zinc-300 "
        onClick={() => toggleSection(title)}
      >
        <Icon className="mr-2 h-4 w-4" />
        {title}
        <ChevronDown className={`ml-auto h-4 w-4 transition-transform duration-200 ${
          openSection === title ? "rotate-180" : ""
        }`} />
      </Button>
      {openSection === title && (
        <div className="mt-1  space-y-1">
          {items.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start pl-8 text-zinc-400 hover:bg-zinc-800 hover:text-white"
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
  return (
    <Sheet>
        <SheetTrigger className='flex items-center gap-2'>{trigger} {isMenu && "Open"}</SheetTrigger>
          <SheetContent side={'left'} className='w-full p-10 flex flex-col justify-between'>
              <SheetHeader>
                    <SheetTitle>
                      <Link href='/'>
                      <h1 className='h1-bold '>Saha<span className='text-primary-500'> A</span></h1>
                      </Link>
                      {session && <SheetDescription>Signed in as {session?.user?.name}</SheetDescription>}
                    </SheetTitle>
                <SheetDescription>
                        <div className='flex flex-col gap-4 mt-16'>
                          <SidebarItem icon={LayoutDashboard}>Dashboard</SidebarItem>
                          <SidebarItem icon={Activity} badge={10}>Activity</SidebarItem>
                          <SidebarItem icon={ShoppingCart} badge={8}>My Cart</SidebarItem>
                          <div className='flex items-center justify-center gap-4 mt-4'>
                            <div className='bg-zinc-300 w-full h-1'></div>
                            <p className='font-inter text-dark400_light700 text-sm'>Category</p>
                            <div className='bg-zinc-300 w-full h-1'></div>
                          </div>
                      
                          {arrayCategory.map((item, index) => (
                            <SidebarSection
                              key={index}
                              title={item}
                              icon={Building}
                              items={categoryItems[item]}
                            />
                          ))}
                        </div>
                  </SheetDescription>
              </SheetHeader>
                    
                    <SheetDescription>
                        {session ? 
                        <div className='flex flex-col gap-2 items-center'>               
                            <Button className="px-4 py-2 items-center justify-center w-full flex gap-2" onClick={()=>signOut()}>Sign Out <LogOut size={20} /></Button>
                        </div>:
                        <div className='flex gap-2 items-center flex-col'>
                            <Button  className='w-full' asChild><Link href={ROUTES.LOGIN} className="px-4 py-2 items-center justify-center flex gap-2">Login <LogIn size={20}/></Link></Button>
                            <Button  className='w-full' asChild><Link href={ROUTES.REGISTER} className="px-4 py-2 items-center justify-center flex gap-2">Sign In <Save size={20}/></Link></Button>
                        </div>}
              </SheetDescription>
          </SheetContent>
      </Sheet> 
  )
}

export default SheetMenu