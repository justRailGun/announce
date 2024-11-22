import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Store, ArrowLeft } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {clsx} from 'clsx'
import CreateForm from './forms/createForm'
export default function ModalTrigger({children} : {children: React.ReactNode}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isShopChoosed, setShopIsChoosed] = useState(false)
  
  const handleChoose = () => {
    setShopIsChoosed(true)
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="px-4 py-2 rounded-lg btn-secondary flex flex-row gap-4 items-center text-black dark:text-white" size="lg">{children}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Create</DialogTitle>
          <DialogDescription className={clsx(isShopChoosed && "hidden")}>
            Choose an option to continue
          </DialogDescription>
        </DialogHeader>
        {isShopChoosed ? <CreateForm defaultValues={{
            name: "",
            description: "",
            location: "",
            adress: "",
            phone: "",
         }} /> :<div className={clsx("flex gap-4 py-4")}>
            <Button className={clsx('w-full')} onClick={() => handleChoose()}>
            Shop <Store className='ml-2' />
          </Button> 
          <Button className='w-full' onClick={() => handleChoose()} variant="outline">
            Announce
          </Button>
        </div>}{isShopChoosed && <ArrowLeft onClick={()=>(isShopChoosed && setShopIsChoosed(false))} className='mx-auto cursor-pointer hover:scale-110' size={20} />}
      </DialogContent>
    </Dialog>
  )
}