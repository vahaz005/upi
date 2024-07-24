'use client'
import { DataTableDemo } from '@/components/TableTransaction';
import { Card } from '@/components/ui/card';
import { BankContext } from '@/context/BankProvider';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { use, useContext, useEffect } from 'react'
import PlaidLink from '@/components/PlaidLink';
import Link from 'next/link';
import {Loader2, LoaderCircle, Plus} from 'lucide-react'
import BankCard from '@/components/BankCard';
import { TabsDemo } from '@/components/Tabsss';
import { Button } from '@/components/ui/button';

const page = () => {
  const {data:session} = useSession() ;
  const accountS = useContext(BankContext)

  const user:User = session!?.user
  useEffect(()=>{
    const gettingTrnsaction = async ()=>{
      try {
       
        const response = await fetch('/api/gettingTransaction' , {
          method:"POST" ,
          body:JSON.stringify({
            access_token:accountS[0].access_Token,
            accountID:accountS[0].id
          })
        }) 
        const finaltrans = await response.json() ;
        console.log(finaltrans)
        
      } catch (error) {
        
      }
    }
gettingTrnsaction()
  } ,[user , accountS])
  if(!session)
    {
      return (
        <div>pls login</div>
      )
    }
    if(accountS.length === 0){
      return (
        <div className='flex w-[82%] justify-center items-center'>
          <Loader2 width={100} height={100}/>
        </div>
      )
    }  
    console.log(accountS)

  return (
    <div className='w-[82%] flex' >
      <div className='w-[70%] , flex flex-col gap-4 p-7'>
    <div className='flex flex-col gap-4 p-2'>
      <h1 className='flex gap-2 text-4xl  font-bold'>Welcome <span className='text-blue-600'>{user.fullName}</span></h1>
      <p className='text-md  text-gray-700'>Access & manage your account and transactions efficiently.</p>
    </div>
    <Card className='w-full h-[30%]'></Card>
    <div className='flex py-4 justify-between items-center'>
      <h3 className='font-semibold'>Recent Transactions</h3>
      <Link href={'/'}><Button variant={'outline'}>View All</Button></Link>
    </div>
  <TabsDemo/>
  
  </div>
  <div className='w-[30%] border-l-2 border-bg-border flex flex-col'>
    <Image src={"/assets/Image wrap inner.png"} alt='' width={1000} height={1000}></Image>
    <div className='w-full p-5 flex flex-col mt-[-15%]'>
    <Image src={"/assets/Content.png"} alt='' width={100} height={100}></Image>
    <h1 className='font-bold text-2xl '>{user.fullName?.toUpperCase()}</h1>
    <p className='text-sm text-gray-700'>{user.email}</p>
    </div>
    <div className='flex w-full p-5 justify-between'>
      <p className='text-md font-bold'>My Banks</p>
      <Link className="text-md flex justify-center items-center" href={`/dashboard/AddBanks/${user.id}`}>Add<Plus width={20} hanging={20}/></Link>
    </div>
      <div className='flex justify-center items-center z-40'>
      <BankCard account={accountS[0]} userName={user.fullName!} showBalance={true}/>
      </div>
      <div  className='flex justify-center items-center ml-10 mt-[-46%]'>
      <BankCard account={accountS[1]} userName={user.fullName!} showBalance={true}/>

      </div>
  
   
   
  
  </div>
  </div>
    
  )
}

export default page
