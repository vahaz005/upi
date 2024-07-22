'use client'
import React from 'react'
import PlaidLink from '@/components/PlaidLink'
import { useParams } from 'next/navigation'
import Image from 'next/image'

const page = () => {
  const param = useParams<{id:string}>()
  return (
    <div className='flex w-full h-screen max-h-screen'>
<div className='w-[50%] flex justify-center items-center'>  
  <div className='flex items-center flex-col w-[50%] h-[35%] gap-7'>
  <div><Image src={"/assets/Frame 3.png"} alt='frame' height={200} width={200}></Image></div>
  <PlaidLink type='Link' variant={'secondary'} userId={param.id}/>

  </div>
  
      
</div>       
 <div className='w-[50%]'>
            <Image src={'/assets/section (1).png'} alt='section' height={1000} width={1000} className='w-full h-full rounded-lg'></Image>
        </div>
        </div>
      
    
  )
}

export default page
