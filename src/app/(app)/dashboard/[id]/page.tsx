'use client'
import { DataTableDemo } from '@/components/TableTransaction';
import { Card } from '@/components/ui/card';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { use, useEffect } from 'react'

const page = () => {
  const {data:session} = useSession() ;
  
  const user:User = session!?.user
  useEffect(()=>{
    const gettingTrnsaction = async ()=>{
      try {
        const response1 = await fetch('/api/gettingBankAccounts' , {
          method:"POST" ,
          body:JSON.stringify({
            userID:user.id
          })
        })
        const finaldata = await response1.json() ;
        console.log(finaldata)
        const response = await fetch('/api/gettingTransaction' , {
          method:"POST" ,
          body:JSON.stringify({
            access_token:finaldata.data[0].accessToken
          })
        }) 
        const finaltrans = await response.json() ;
        console.log(finaltrans)
        
      } catch (error) {
        
      }
    }
gettingTrnsaction()
  } ,[user])
  if(!session)
    {
      return (
        <div>pls login</div>
      )
    }
  return (
    <div className='w-[60%] , flex flex-col gap-4 p-7'>
      <div className='flex flex-col gap-4 p-2'>
        <h1 className='flex gap-2 text-4xl  font-bold'>Welcome <span className='text-blue-600'>{user.fullName}</span></h1>
        <p className='text-md  text-gray-700'>Access & manage your account and transactions efficiently.</p>
      </div>
      <Card className='w-full h-[30%]'></Card>
      <DataTableDemo/>
    
    </div>
  )
}

export default page
