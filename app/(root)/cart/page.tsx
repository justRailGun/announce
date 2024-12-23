'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useContext, useMemo } from "react"
import { CartContext } from "@/app/Context/CartContext" 
import { useEffect, useState } from "react"
import { Product } from "@/constants/product"
interface productPage extends Product{
    quantity:number
}
const Page = () =>{
    const cartContext = useContext(CartContext)
    const cart = useMemo(() => cartContext ? cartContext.cart : [], [cartContext])
    const [loading, setLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<[productPage] | null>(null)

    useEffect(() => {
        const getProducts = async ()=>{
            
            const res = await fetch("http://localhost:3000/api/products/cart",{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({cart : cart})
            })
            if(res.ok){
                const data = await res.json()
                setProducts(data.data)
                setLoading(false)
            }
        }
        console.log(cart)
        getProducts()
    },[cart])
    if(loading){
        return <div>Loading...</div>
    }
    return (
        <main className="pt-24 min-h-screen">
            <Table>
                <TableCaption>A list of your Products Cart.</TableCaption>
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Products</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead >Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {products!.map((product) => (
                    <TableRow key={product._id}>
                        
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.category.name}</TableCell>
                    <TableCell>1</TableCell>

                    <TableCell className="text-right">{product.price}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
                <TableFooter>
                <TableRow>
                    <TableCell colSpan={4}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
                </TableFooter>
            </Table>
      </main>
    )
  }
export default Page