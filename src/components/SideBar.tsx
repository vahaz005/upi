'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { ModeToggle } from './Toggle'
import { Input } from '@/components/ui/input'
import { LogOut, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Separator } from './ui/separator'
import { useSession } from 'next-auth/react'
import { User } from 'next-auth'
import { off } from 'process'
import Link from 'next/link'

type sidebar = {
  Link:string ,
  icon:string ,
  name:string
}



const SideBar = () => {
  const {data:session} = useSession() ;
  const currentuser:User = session!?.user
  const [active , serActive] = useState<string>('Home') ;
  if(!currentuser){
    return(
      <div>pl Log in</div>
    )
  }
 
  const sidebar: sidebar[] = [
    { Link:`/dashboard/${currentuser.email}`, icon: '/assets/house.svg', name: 'Home' },
    {Link:`/dashboard/MyBank/${currentuser.id}/`, icon: '/assets/credit-card.svg', name: 'My Banks' },
    { Link:`/dashboard/TransacTionHistory/${currentuser.email}`,icon: '/assets/arrow-left-right.svg', name: 'Transaction History' },
    {Link:`/dashboard/Payments/${currentuser.email}`, icon: '/assets/badge-dollar-sign.svg', name: 'Payment Transfer' },
    
    {Link:`/dashboard/AddBanks/${currentuser.id}`, icon: '/assets/landmark.svg', name: 'Add Banks' }
  ];
  


 
  return (
    <div className='w-[18%] flex flex-col justify-between items-center p-8 gap-6'>
      <div className='flex flex-col gap-5'>        <div  className='flex gap-4'><Image src={"/assets/Frame 3.png"} alt='frame' height={150} width={150}></Image>
                  <ModeToggle/></div>
                  <div className='flex gap-2 items-center justify-center'>
                    <Search width={25} height={25}/>
                    <Input type='text' placeholder='Search'/></div>
                   <div className='flex flex-col w-full gap-3'>
                    {
                      sidebar.map((item)=> 
                        <Link href={item.Link}>   <div onClick={()=>{
                          serActive(item.name)
                        }} key={item.name} className={cn(` rounded-md p-3 cursor-pointer flex text-foreground text-semibold items-center gap-3 ${active === item.name && 'bg-input'}`)}>
                          <Image src={item.icon} alt='section' width={25} height={25}></Image>
                          <p>{item.name}</p>

                        </div></Link>
                      
                      )
                    }

                   </div></div>
          
<div className='flex justify-center items-center gap-2 mt-40'>  <div className='flex flex-col border-t-2 border-bg-border w-full'>
                    <h3 className='text-sm font-bold'>{currentuser?.fullName?.toUpperCase()}</h3>
                    <p className='text-xs'>{currentuser.email}</p>
                   </div>
                   <LogOut width={25} height={25} /></div>
                  

      
    </div>
  )
}

export default SideBar
