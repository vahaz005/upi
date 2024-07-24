'use client'
import { create } from "domain";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { AccountBase } from "plaid";
import { createContext, ReactNode, useEffect, useState } from "react";
import { number, string } from "zod";

const BankContext  = createContext<account[]>([]) ;
export interface account  {
  id: string , 
  availableBalance: number
  currentBalance: number ,
  institutionId: string ,
  access_Token:string ,
  name: string ,
  officialName: string
  mask: number ,
  type: string ,
  subtype: string ,
  appwriteItemId: string,
  sharaebleId: string
};

export default function  BankProvider({children}:{
    children:ReactNode
}){
    const [accountS , setBankAccount] = useState<account[]>([]);
    const {data:session} = useSession() ;
    const user:User = session!?.user
    console.log(user)
    useEffect(()=>{
     
      const gettingaccount = async () =>{
        const response = await fetch('/api/gettingBankAccounts' , {
          method:"POST" ,
          body:JSON.stringify({
            userID:user.id
          })
        })
        const finaldata = await response.json() ;
        console.log(finaldata)
  
        setBankAccount(finaldata.data)
  console.log(accountS)
      }
  
      gettingaccount()
    } , [user])

    return (

    <BankContext.Provider value={accountS}>

        {children}
    </BankContext.Provider>
)
    
}
export {BankContext , BankProvider}