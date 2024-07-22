'use client'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { IVerifySchema , VerifySchema } from '@/ZodSchemas/SignUp'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'
import { Card } from '@/components/ui/card'

const page = () => {
  const param = useParams<{username:string}>()
  const [verify, setIsverifying] = useState<boolean>(false)
    const form = useForm<IVerifySchema>({
        resolver:zodResolver(VerifySchema) ,
        defaultValues:{
            verifyCode:''
        }

    })
    const router = useRouter()
    const {toast} = useToast()
    const onsubmit =async (data:IVerifySchema) =>{
     
      setIsverifying(true) ;
      try {
          const response = await fetch("/api/verifycode" ,  {
              method:"POST" ,
              body:JSON.stringify({
                  id:param.username ,
                  newcode : data.verifyCode
              })
          })

          const finaldata = await response.json() ;
          console.log(finaldata)
   

if(finaldata.message === 'user verified successfully') {
             toast({
              title:"success" ,
              description:"user verified"


         }
       

         )
         router.push(`/Linkaccount/${param.username}`)
      } else {
        toast({
          title:"failure" ,
          description:finaldata.message
        })
      }
          
      } catch (error:any) {
          console.log(error.message , "error while veryfying at line 43 of app/verify/[username]") ;
          toast({
              title:"verification  failed" ,
              description:error.message ,
              variant:"destructive"
          })
          
      } finally{
          setIsverifying(false) ;
      }


    }
  return (
    <div className='flex justify-center items-center w-full h-screen max-h-screen '>
         <Form {...form}>
        
      <form onSubmit={form.handleSubmit(onsubmit)} className="w-[30%] space-y-6">
        <FormField
          control={form.control}
          name="verifyCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your Email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
 
        <Button className='flex gap-2' type="submit">
          {verify &&        <Loader2 width={20} height={20}/> }
   
          Submit</Button>
      </form>
    </Form>
      
    </div>
  )
}

export default page
