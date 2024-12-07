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
import { Activity,  Building,  Car,  ChevronDown, LayoutDashboard, LogIn, LogOut, Package, Save, Shirt, ShoppingCart, Sofa } from 'lucide-react'
import { useQueryState } from 'nuqs'

const SheetMenu = ({trigger , isMenu =false} : {trigger: React.ReactNode,isMenu?: boolean}) => {
  const {data:session} = useSession() ;
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [category,setCategory] = useQueryState("category")

  const handleClick = (value: string) => {
    if(value===category){
      setCategory(null)
    }else{
      setCategory(value)
    }
  }
  const iconCheck = (value: string) => {
    const icons: Record<string, React.ElementType | null> = {
      "Real Estate":Building,
      "Clothing": Shirt ,
      "Product": Package ,
      "Vehicule": Car ,
      "Furniture" : Sofa, 
    };
  
    return icons[value] || null;
  };
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
  const SidebarSection = ({ title, icon: Icon, items }: { title: string, icon:React.ElementType | null , items: { title: string, icon: React.ElementType }[] }) => (
    <span className=''>
      <Button
        variant="ghost"
        className="w-full text-lg justify-start text-dark100_light900 hover:bg-zinc-300 "
        onClick={() => toggleSection(title)}
      >
        {Icon && <Icon className="mr-2 h-4 w-4" />}
        {title}
        <ChevronDown className={`ml-auto h-4 w-4 transition-transform duration-200 ${
          openSection === title ? "rotate-180" : ""
        }`} />
      </Button>
      {openSection === title && (
        <span className="mt-1  space-y-1">
          {items.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start pl-8 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              onClick={()=>handleClick(item.title.toLocaleLowerCase())}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </Button>
          ))}
        </span>
      )}
    </span>
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
                        <span className='flex flex-col gap-4 mt-16'>
                          <SidebarItem icon={LayoutDashboard}>Dashboard</SidebarItem>
                          <SidebarItem icon={Activity} badge={10}>Activity</SidebarItem>
                          <SidebarItem icon={ShoppingCart} badge={8}>My Cart</SidebarItem>
                          <span className='flex items-center  justify-center gap-4 mt-4'>
                            <span className='bg-zinc-300 w-16 h-1'></span>
                            <span className='font-inter text-dark400_light700 text-sm'>Filter by: Category</span>
                            <span className='bg-zinc-300 w-16 h-1'></span>
                          </span>
                      
                          {arrayCategory.map((item, index) => (
                            <SidebarSection
                              key={index}
                              title={item}
                              icon={iconCheck(item)}
                              items={categoryItems[item]}
                            />
                          ))}
                        </span>
                  </SheetDescription>
              </SheetHeader>
                    
                    <SheetDescription>
                        {session ? 
                        <span className='flex flex-col gap-2 items-center'>               
                            <Button className="px-4 py-2 items-center justify-center w-full flex gap-2" onClick={()=>signOut()}>Sign Out <LogOut size={20} /></Button>
                        </span>:
                        <span className='flex gap-2 items-center flex-col'>
                            <Button  className='w-full' asChild><Link href={ROUTES.LOGIN} className="px-4 py-2 items-center justify-center flex gap-2">Login <LogIn size={20}/></Link></Button>
                            <Button  className='w-full' asChild><Link href={ROUTES.REGISTER} className="px-4 py-2 items-center justify-center flex gap-2">Sign In <Save size={20}/></Link></Button>
                        </span>}
              </SheetDescription>
          </SheetContent>
      </Sheet> 
  )
}

export default SheetMenu