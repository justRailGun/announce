'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { z } from "zod"
import {useEffect, useState} from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { getSchema } from "@/lib/validation"
import { getDefaultValues } from "@/constants/DefaultValues";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { CREATE_API } from "@/constants/route";
import { useToast } from "@/hooks/use-toast";



type Category = {
    _id: string;
    name: string;
    slug: string;
    parentCategory?: string;
  }

const ProductModal = ({children} : {children:React.ReactNode}) => {
    const [categories, setCategories] = useState<Category[]>([])
    const [subCategory, setSubCategory] = useState<Category[]>([])
    const [schema,setSchema] = useState(getSchema("ProductSchema"))
    const [arraySubCategory, setArraySubCategory] = useState<Category[]>([])
    const [isCategoryChoosed, setCategoryIsChoosed] = useState<boolean>(false)
    const [apiCall , setApiCall] = useState("") ; 
    const {toast} = useToast()
    const [isDefaultValues, setIsDefaultValues] = useState({ 
        category :"" ,
        "Sub-Category" : "",
        name : "",        
        price: "",
        description : "",
    })
    const defaultValues =  {
        category :"",
        "Sub-Category" : "",
        name : "",        
        price: "",
        description : "",
        }

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: isDefaultValues
      })


        async  function  onSubmit(values: z.infer<typeof schema>) {
          
            values = form.getValues();console.log(values)
            const res =  await fetch(CREATE_API.PRODUCTS(apiCall), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
              })
              if(res.ok){
                toast({
                  title: res.status.toString(),
                  description: "SubCategory created successfully",
                })
                form.reset(isDefaultValues);
              }
              else{
                toast({
                  title : res.status.toString(),
                  description : res.statusText,
                  variant: "destructive",
                })
              }
            }

    // useEffect(() => {
    //     form.reset(isDefaultValues);
    //   }, [isDefaultValues, form ]);

      useEffect(() => {
        const subscription = form.watch((value) => {
          console.log("Form values:", value);
        });
        return () => subscription.unsubscribe();
      }, [form]);
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
        }
        fetchSubCategory();
        fetchCategory();
    }
    ,[])

    const getValue = (value: string) => {
      return categories.find((item) => item._id === value)?.name;
    }

    const handleChange = (value: string) => {
      setArraySubCategory(subCategory.filter((item) => item.parentCategory === value));
      setCategoryIsChoosed(true);
    
      // Obtenir le nom de la catégorie
      const selectedCategory = categories.find((item) => item._id === value)?.name;

      const newSchema = getSchema(selectedCategory);
      setSchema(newSchema.merge(getSchema("Real Estate")));
    
      const newDefaults = { ...defaultValues, ...getDefaultValues(selectedCategory || "") };
      setIsDefaultValues(newDefaults);

      
      // Mettre à jour l'API utilisée
      setApiCall(selectedCategory || "");
    };
    
      
    return(
        <Dialog>
        <DialogTrigger className="flex items-center gap-2">{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Product</DialogTitle>
            <DialogDescription>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 space-y-6">
                {Object.keys(isDefaultValues).map((item)=>{
                    return (
                        <>
                            {item ==="category" ? 
                            <>
                               <FormField
                                control={form.control}
                                name={item}
                                key={item}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select
                                            defaultValue={getValue(item)}
                                            onValueChange={(value) => {
                                                field.value=value;
                                                field.onChange(value);
                                                handleChange(value);
                                            }}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a Category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories.map((item) => (
                                                    <SelectItem key={item._id} value={item._id}>{item.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                                    
                            </>
                            :
                            <>
                                {item==="Sub-Category" ? 
                                <>
                                    <FormField
                                    key={item}
                                    control={form.control}
                                    name={item}
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Sub-Category</FormLabel>
                                        <Select disabled={!isCategoryChoosed} onValueChange={field.onChange}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a Sub-Category" />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                            {arraySubCategory.map((item)=>(
                                                <SelectItem key={item._id} value={item._id}>{item.name}</SelectItem>
                                            ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                </FormItem>
                                    )}
                                    />
                                </> : 
                                <>
                                    <FormField
                                        control={form.control}
                                        name={item}
                                        key={item}
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>{item.charAt(0).toUpperCase() + item.slice(1)}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={item} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                </>}
                            </>}
                         
                        </>
                    )
                })
                   
                }
        <Button type="submit">Submit</Button>
      </form>
    </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      
)
}
  
export default ProductModal