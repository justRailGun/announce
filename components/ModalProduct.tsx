
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,

    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import CreateForm from "./forms/createForm"
import { z } from "zod"
import {useEffect, useState} from "react"

type Category = {
    _id: string;
    name: string;
    slug: string;
    parentCategory: string;
  }
const ProductModal = ({children} : {children:React.ReactNode}) => {
    const [categories, setCategories] = useState<Category[]>([])
    const [subCategory, setSubCategory] = useState<Category[]>([])
    useEffect(()=>{
        const fetchCategory = async ()=>{
            const res = await fetch('api/admin/creation/category');
            const data = await res.json();
            setCategories(data.data);
        }
        const fetchSubCategory = async ()=>{
            const res = await fetch('api/admin/creation/category/subCategory');
            const data = await res.json();
            setSubCategory(data.data);
            console.log(data.data); 
        }
        fetchSubCategory();
        fetchCategory();
    }
    ,[])

    const defaultValues = {
        name : "",
        description : "",
        size : [],
        category : categories.map((item)=>item.name),
        "Sub-Category" : subCategory.filter((item)=>item.parentCategory===categories[0]._id).map((item)=>item.name),
      }
      const fetchApi = "http://localhost:3000/api/shop/product"
      const SchemaType = z.object({
        name : z.string().min(1),
        description : z.string().min(1),
        size : z.string().min(1),
        category : z.string().min(1),
        type : z.string().min(1),
      })
    return(
    <AlertDialog>
        <AlertDialogTrigger className="flex gap-2 items-center">{children}</AlertDialogTrigger>
        <AlertDialogContent className="min-w-fit">
            <AlertDialogHeader>
            <AlertDialogTitle>Product Creation</AlertDialogTitle>
            <AlertDialogDescription>
                <CreateForm     
                defaultValues={defaultValues}
                fetchApi={fetchApi}
                SchemaType={SchemaType}
                />

            </AlertDialogDescription>
            </AlertDialogHeader>
        </AlertDialogContent>
    </AlertDialog>
)
}
  
export default ProductModal