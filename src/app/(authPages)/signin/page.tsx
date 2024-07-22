'use client'
import { SignInSchema ,SignInSchemaType  } from '@/ZodSchemas/SignIn'
import { signIn, useSession } from 'next-auth/react';

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'

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
import { da, fi } from 'date-fns/locale'
import { AwardIcon, Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { User } from 'next-auth';
const Page = () => {
  const [submitting  , setSubmitting] =useState<boolean>(false) ;

    const form = useForm<SignInSchemaType>({
        resolver:zodResolver(SignInSchema) ,
        defaultValues:{
        email:"" ,
        password:""
        }
    });
 const {toast} = useToast()
 const router = useRouter()
    const onSubmit = async (data:SignInSchemaType) =>{
      setSubmitting(true)
      try {
        const result = await signIn('credentials', {
          
        email: data.email,
          password: data.password  ,
          redirect:false 
        });
    
        console.log("error at 45" ,result ); // Log the result to see its structure
    
        if (result?.error) {
          console.error('Authentication error:', result.error);
          
          // Handle authentication failure
          toast({
            title: 'Login Failure',
            description: result.error
          });
        }
    
        if (result?.url) {
       router.push(`/dashboard/${data.email}`)
        
         
          }

        
          // Redirect user to dashboard upon successful login
          
          
        }
      
       catch (error) {
        console.error('Error during login:', error);
        toast({
          title: 'Login Failure',
          description: 'An unexpected error occurred while logging in.'
        });
      } finally{
        setSubmitting(false )
      } 

    }
    

        


  return (
    <div className='flex w-full h-screen max-h-screen'>
        <ModeToggle/>
        <div className='w-[50%] flex justify-center items-center overflow-scroll remove-scrollbar'>
          <div className='h-[90%] w-[70%] flex flex-col gap-10 justify-center'>
            <div><Image src={"/assets/Frame 3.png"} alt='frame' height={200} width={200}></Image></div>
          


          <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
       
         
      
       

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
        <Button  disabled= {submitting}className='w-full flex gap-2' type="submit">
          {submitting && 
           <Loader2 width={20} height={20}/>}
         
          Sign In</Button>
      </form>
    </Form>
    <p className=' mx-auto max-w-sm flex text-gray-700 gap-1'>Not Yet Registered!
      <Link href={"/signup"} className='text-blue-600'>
            Sign Up
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