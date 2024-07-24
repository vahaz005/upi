'use client'
import { Component } from '@/components/PieChart'
import { Item } from '@radix-ui/react-dropdown-menu'
import { AwardIcon, Loader, Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { AccountBase } from 'plaid'
import BankCard from '@/components/BankCard'
import { useSession } from 'next-auth/react'
import { User } from 'next-auth'
import { account, BankContext } from '@/context/BankProvider'
export interface Chart {
  number:string , 
  balance:number | null
}

const page = () => {
  const {data:session} = useSession() ;
  if(!session){
    console.log("no session")
  }
  const user:User = session!?.user
  const paramas = useParams<{id:string}>()
  console.log(paramas)
  const[chartData , setChartData] = useState<Chart[]>([]) ;
  const accountS = useContext(BankContext) ;
  useEffect(() => {
    if (accountS.length > 0) {
      const newData = accountS.map((item:account) => ({
        number: item.name,
        balance: item?.currentBalance,
      }));

      setChartData((prev) => {
        const existingNumbers = new Set(prev.map((data) => data.number));
        const filteredData = newData.filter((item) => !existingNumbers.has(item.number));
        return [...prev, ...filteredData];
      });
    }
    
  }, [accountS]);
//   const [accountS , setBankAccount] = useState<AccountBase[]>([]);
//   useEffect(()=>{
   
//     const gettingaccount = async () =>{
//       const response = await fetch('/api/gettingBankAccounts' , {
//         method:"POST" ,
//         body:JSON.stringify({
//           userID:paramas.id
//         })
//       })
//       const finaldata = await response.json() ;
//       console.log(finaldata)

//       const accounts = await fetch('/api/getaccounts' , {
//         method:"POST" ,
//         body:JSON.stringify({
//           access_token :finaldata.data[0].accessToken
//         })
//       })
//       const finalaccounts = await accounts.json() ;
//       console.log(finalaccounts)
//       setBankAccount(finalaccounts.data)
// console.log(accountS)
//     }

//     gettingaccount()
//   } , [])
  if(accountS.length === 0){
    return (
      <div className='flex w-[82%] justify-center items-center'>
        <Loader2 width={100} height={100}/>
      </div>
    )
  }  
  console.log(accountS)
 
  if(!chartData){
    return (
      <div className='flex w-[82%] justify-center items-center'>
        <Loader width={100} height={100}/>
      </div>
    )
  } 
  if(!session || !user){
    return (
      <div>pls login</div>
    )
  } 
  return (
    <div className='w-[82%] flex flex-col p-3 gap-4 items-center'>
      <div className='flex justify-center items-center w-[40%]'>
      <Component chartData={chartData} />
      </div>

      <div className='w-full grid grid-cols-3'>
      {
        accountS.map((item)=>
          <BankCard account={item} showBalance={true} userName={user.fullName!}/>
        )
      }
      </div>
 
    </div>
  )
}

export default page
