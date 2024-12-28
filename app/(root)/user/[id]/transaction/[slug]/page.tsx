import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Product } from "@/constants/product"
import { PrinterIcon } from 'lucide-react'

export default async function InvoicePage({params } : {params : Promise<{ slug: string, id : string }>} ) {

    const {slug} = await params
    const res  = await fetch(`http://localhost:3000/api/transaction/${slug}`)
    const data = await res.json()
    const userInformation = data.data['User Information']
    const shippingAddress = data.data['Shipping Adress']
    const products = data.data['products']
    const quantity = data.data['quantity']
    const total = products.reduce((acc : number , curr : Product , index: number )=> acc + curr.price * quantity[index] , 0)
    const date = new Date(data.data.createdAt).toISOString().split("T")[0]
  return (
    <div className="container mx-auto pt-24">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Transaction  : {slug}</CardTitle>
          <Button variant="outline" size="icon">
            <PrinterIcon className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-semibold mb-1">Invoice To:</h3>
              <p>{userInformation.name}</p>
              <p>{userInformation.email}</p>
              <p>{shippingAddress.address}, {shippingAddress.city}, {shippingAddress["Zip Code"]} ,{shippingAddress.country}</p>
            </div>
            <div className="text-right">
              <p><span className="font-semibold">Invoice Number: </span> INV-001</p>
              <p><span className="font-semibold">Date: </span> {date}</p>
              <p><span className="font-semibold">Due Date:</span> {date}</p>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product : Product, index : number) => (
                <TableRow key={product._id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="text-right">{quantity[index]}</TableCell>
                  <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${(quantity[index] * product.price).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-6 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${(total*0.19).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${(total-total*0.19).toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 mt-6">
          <p className="text-sm text-muted-foreground">Thank you for your business. Please remit payment by the due date.</p>
        </CardFooter>
      </Card>
    </div>
  )
}