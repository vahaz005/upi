'use client'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { BankContext } from '@/context/BankProvider'
import { Loader2 , BanknoteIcon} from 'lucide-react'
import React, { useContext } from 'react'

const page = () => {
  const accountS = useContext(BankContext) ;
  if(accountS.length === 0){
    return (
      <div className='flex w-[82%] justify-center items-center'>
      <Loader2 width={100} height={100}/>
    </div>
    )
  }

  
  return (
    <div className='w-[82%] flex flex-col p-5 '>
    <div className='flex flex-col gap-3 p-2'>
   <h1 className='flex gap-2 text-4xl  font-bold'>PayMent Transfer</h1>
   <p className='text-md  text-gray-700'>Please provide any specific details or notes related to the payment transfer</p>
 </div>
 <div className='flex flex-col gap-1 p-2'>
   <h1 className='flex gap-2 text-xl  font-bold'>Transfer Details</h1>
   <p className='text-sm  text-gray-700'>Enter the details of the recipient</p>
 </div>
 <Separator className='mt-7'/>
 <div className='flex items-center justify-between p-1'>
 <div className='flex flex-col gap-1  p-4'>
   <h1 className=' text-md text-gray-800  font-bold'>select Source Bank</h1>
   <p className='text-sm  text-gray-700'>Select the bank account you want to transfer funds from</p>
   
  
 </div>
 <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='flex items-center gap-2' variant="outline">
          <BanknoteIcon color='blue'/>
          
          Select Accounts</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel> Accounts</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup>
         {
          accountS.map((item)=>
            <DropdownMenuRadioItem value='' >{item.name}</DropdownMenuRadioItem>
          
          )
        }
         
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
 </div>
 <Separator className='mt-7'/> 
 <div className='flex items-center justify-between px-9'>
 <div className='flex flex-col gap-1  p-4'>
   <h1 className=' text-md text-gray-800  font-bold'>Transfer Note (Optional)</h1>
   <p className='text-sm  text-gray-700'>Please provide any additional information or instructions related to the transfer </p>
   
  
 </div>
<Textarea  placeholder='Dear John,
I hope this message finds you well. I am transferring $100 to your account for fun. Please confirm once you receive it.'></Textarea>
 </div>

<Separator className='mt-7'/>
<div className='flex flex-col gap-1 p-4'>
   <h1 className='flex gap-2 text-xl  font-bold'>Bank account details</h1>
   <p className='text-sm  text-gray-700'>Enter the bank account details of the recipient</p>
 </div>
 <Separator className='mt-4'/>
 <div className='flex items-center gap-6 px-2 '>
 <div className='flex flex-col gap-1  p-4  w-[30%]'>
   <h1 className=' text-md text-gray-800  font-bold'>Recipient's Email Address</h1>
   
  
 </div>
<Input className='w-[40%]'></Input>
 </div>
 <Separator className='mt-4'/>
 <div className='flex items-center gap-6 px-2 '>
 <div className='flex flex-col gap-1  p-4  w-[30%]'>
   <h1 className=' text-md text-gray-800  font-bold'>Recipient's BankAccount Number</h1>
   
  
 </div>
<Input className='w-[40%]'></Input>
 </div>
 <Separator className='mt-4'/>
 <div className='flex items-center gap-6 px-2'>
 <div className='flex flex-col gap-1  p-4 w-[30%]'>
   <h1 className=' text-md text-gray-800  font-bold'>Amount</h1>
   
  
 </div>
<Input className='w-[40%]'></Input>
 </div>
 <Button className='w-[50%] mt-9' type='submit'>Transfer Funds</Button>
 
 </div>
  )
}

export default page
