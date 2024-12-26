import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PrinterIcon } from 'lucide-react'

// This would typically come from your order processing system
const invoiceData = {
  invoiceNumber: "INV-001",
  date: "2023-06-15",
  dueDate: "2023-07-15",
  customerName: "John Doe",
  customerEmail: "john.doe@example.com",
  customerAddress: "123 Main St, Anytown, AN 12345",
  items: [
    { id: 1, name: "Product A", quantity: 2, price: 19.99 },
    { id: 2, name: "Product B", quantity: 1, price: 29.99 },
    { id: 3, name: "Product C", quantity: 3, price: 9.99 },
  ],
  subtotal: 99.94,
  tax: 8.00,
  total: 107.94,
}

export default async function InvoicePage({params } : {params : Promise<{ slug: string, id : string }>} ) {
    const {slug} = await params
    console.log("slug",slug)
    const res  = await fetch(`http://localhost:3000/api/transaction/${slug}`)
    const data = await res.json()
    console.log("data",data.data)
    const userInformation = data.data['User Information']
    const shippingAddress = data.data['Shipping Adress']
    console.log("user :",userInformation)
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
              <p><span className="font-semibold">Date:</span> {invoiceData.date}</p>
              <p><span className="font-semibold">Due Date:</span> {invoiceData.dueDate}</p>
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
              {invoiceData.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${(item.quantity * item.price).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-6 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${invoiceData.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${invoiceData.tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${invoiceData.total.toFixed(2)}</span>
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