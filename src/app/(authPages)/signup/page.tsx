'use client'
import { IUserSchema, SignUpSchema } from '../../../ZodSchemas/SignUp'
import {Loader2} from "lucide-react"
import { useToast } from '@/components/ui/use-toast'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { ToastAction } from '@/components/ui/toast'

import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { ModeToggle } from '../../../components/Toggle'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from '@radix-ui/react-icons'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import Link from 'next/link'
import { da, tr } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
const Page = () => {
const [submitting , Setsubmitting] = useState<boolean>(false)
const {toast} = useToast()
    const form = useForm({
        resolver:zodResolver(SignUpSchema) ,
        defaultValues:{
          fullName: "",
          email: "",
          password: "",
          address: "",
          postalCode: "",
          ssn: "",
          dateOfBirth: "" ,
          state: "",
        }
    });
const router = useRouter()
    const onSubmit = async (data:IUserSchema) =>{
      Setsubmitting(true)
   try {
       const response = await fetch("/api/signup" ,  {
         method:"POST" ,
         body:JSON.stringify(data)
       })
       const finaldata = await response.json() ;
       console.log(finaldata)
       if(finaldata.success){
        toast({
          title:"success" ,
          description:finaldata.message ,
        })
        router.push(`/Verify/${finaldata?.data?._id}`)
       } else {
        toast({
          title: "Failure" , 
          description:finaldata.message ,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
       }
       
       
 
     }
    catch (error:any) {
      console.log(error.message ,"error while signup on client side") ;

    
   } finally{
    Setsubmitting(false)
   }
  }

        


  return (
    <div className='flex w-full h-screen max-h-screen'>
        <ModeToggle/>
        <div className='w-[50%] flex justify-center items-center overflow-scroll remove-scrollbar'>
          <div className='h-[90%] w-[70%] flex flex-col gap-10 '>
            <div><Image src={"/assets/Frame 3.png"} alt='frame' height={200} width={200}></Image></div>
          


          <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField 
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>FullName</FormLabel>
              <FormControl>
                <Input placeholder="ex.jhon Carter" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField 
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter your specific address" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex w-full justify-between'>
        <FormField 
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem className='w-[45%]'>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="ex. New Delhi" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
            <FormField 
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem className='w-[45%]'>
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input placeholder="ex.11011" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className='flex w-full justify-between'>
        <FormField 
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className='w-[45%]'>
              <FormLabel>Date of Birth</FormLabel>
           <FormControl>
            <Input type='date' {...field}/>
           </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
            <FormField 
          control={form.control}
          name="ssn"
          render={({ field }) => (
            <FormItem className='w-[45%]'>
              <FormLabel>SSN</FormLabel>
              <FormControl>
                <Input placeholder="ex.1234" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        <FormField 
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your specific email" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField 
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder="Enter your password" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={submitting} className='w-full flex' type="submit">
          {submitting && <Loader2 width={20} height={20}/>}
          Sign Up</Button>
      </form>
    </Form>
    <p className=' mx-auto max-w-sm flex text-gray-700 gap-1'>Already have an account!
      <Link href={"/signin"} className='text-blue-600'>
            Sign In
            </Link>
            </p>
          </div>
        </div>
        <div className='w-[50%]'>
            <Image src={'/assets/section (1).png'} alt='section' height={1000} width={1000} className='w-full h-full rounded-lg'></Image>
        </div>
      
    </div>
  )
}

export default Page