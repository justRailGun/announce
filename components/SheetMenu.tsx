'use client'
import React, { useState , useEffect} from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from './ui/button'
import Link from 'next/link'

import { ROUTES } from '@/constants/route'
import {  useSession, signOut } from 'next-auth/react'
import getIcons from '@/constants/icons'
import { useQueryState } from 'nuqs'
import { Product } from '@/constants/product'
import { Activity,  ChevronDown, LayoutDashboard, LogIn, LogOut, Save, ShoppingCart} from 'lucide-react'


const SheetMenu = ({trigger , isMenu =false} : {trigger: React.ReactNode, isMenu?: boolean}) => {
  const {data:session} = useSession() ;
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [loading,setLoading] = useState(true);
  const [category,setCategory] = useQueryState("category")
  const [subCategory,setSubCategory] = useQueryState("subCategory")
  const [dataCategory,setDataCategory] = useState<[Product["category"] ]| null>(null);
  const [dataSubCategory,setDataSubCategory] = useState<[Product["Sub-Category"]]| null>(null);
  useEffect(()=>{
    const getCategory = async()=>{
      try{
        const res = await fetch(`http://localhost:3000/api/category`);
        const data = await res.json();
        setDataCategory(data)
        console.log(data)
      }
      catch(error){
        console.log(error)
      }
      finally{
        setLoading(false)
      }
    }
    const getSubCategory = async()=>{
      try{
        const res = await fetch(`http://localhost:3000/api/subcategory`);
        const data = await res.json();
        setDataSubCategory(data)
        console.log(data)
      }
      catch(error){
        console.log(error)
      }
      finally{
        setLoading(false)
      }
    }
    getSubCategory()
    getCategory()
    return ()=>{}
  },[])
  if(loading){
    return <div>Loading...</div>
  }
  if(!dataCategory){
    return <div>No category found</div>
  }
  
  const handleClick = (value: string) => {
    if(value===category){
      setCategory(null)
    }else{
      setCategory(value)
    }
  }
  const handleSubClick = (value: string) => {
    if(value===subCategory){
      setSubCategory(null)
    }else{
      setSubCategory(value)
    }
  }

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


  const SidebarSection = ({ category }: { category : Product['category'] }) => (
    <span className=''>
      <Button
        variant="ghost"
        className="w-full text-lg justify-start text-dark100_light900 hover:bg-zinc-300 "
        onClick={() => {
          toggleSection(category.slug)
          handleClick(category.slug)
        }}
      >
        {getIcons({name:category.name})}
        {category.name}
        <ChevronDown className={`ml-auto h-4 w-4 transition-transform duration-200 ${
          openSection === category.slug ? "rotate-180" : ""
        }`} />
      </Button>
      {openSection === category.slug && (
        <span className="mt-1  space-y-1">
          {dataSubCategory!.map((item, index) => {

            return(
              <>{item.parentCategory===category._id && <Button
              key={index}
              variant="ghost"
              className="w-full justify-start pl-8 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              onClick={()=>handleSubClick(item.name.toLocaleLowerCase())}
            > 
              {getIcons({name:item.name})}
              {item.name}
            </Button>
          }
            </>
            )
          }
            
          )}
        </span>
      )}
    </span>
  )
// 

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
                      
                          {dataCategory!.map((item) => (
                            <SidebarSection
                              key={item._id}
                              category={item}
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