'use client'
import PlaidLink from '@/components/PlaidLink'
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const params = useParams<{id:string}>()
  return (
    <div className='flex w-[82%]  h-screnn max-h-screen justify-center items-center'>

        <PlaidLink userId={params.id} variant={'outline'} type='some'/>

    
    </div>
  )
}

export default page
