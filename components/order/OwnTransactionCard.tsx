import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, PackageIcon, MapPinIcon, PhoneIcon, MailIcon, UserIcon } from 'lucide-react'

interface TransactionCardProps {
  transactionId: string
  productCount: number
  totalCost: number
  date: string
  customerName: string
  customerEmail: string
  customerPhone: string
  shippingAddress: string
}

export default function OwntransactionCard({
  transactionId,
  productCount,
  totalCost,
  date,
  customerName,
  customerEmail,
  customerPhone,
  shippingAddress
}: TransactionCardProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Transaction Details</CardTitle>
        <Badge variant="outline" className="text-sm font-semibold">
          #{transactionId}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center space-x-4">
            <PackageIcon className="h-5 w-5 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Products</p>
              <p className="text-sm text-muted-foreground">{productCount} item(s)</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <CalendarIcon className="h-5 w-5 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Date</p>
              <p className="text-sm text-muted-foreground">{date}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <UserIcon className="h-5 w-5 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Customer</p>
              <p className="text-sm text-muted-foreground">{customerName}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <MailIcon className="h-5 w-5 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Email</p>
              <p className="text-sm text-muted-foreground">{customerEmail}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <PhoneIcon className="h-5 w-5 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Phone</p>
              <p className="text-sm text-muted-foreground">{customerPhone}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <MapPinIcon className="h-5 w-5 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Shipping Address</p>
              <p className="text-sm text-muted-foreground">{shippingAddress}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Total Cost</p>
            <p className="text-2xl font-bold">${totalCost.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}