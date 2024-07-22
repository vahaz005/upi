'use client'
import { create } from "domain";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { AccountBase } from "plaid";
import { createContext, ReactNode, useEffect, useState } from "react";

const BankContext  = createContext<AccountBase[]>([]) ;

export default function  BankProvider({children}:{
    children:ReactNode
}){
    const [accountS , setBankAccount] = useState<AccountBase[]>([]);
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
  
        const accounts = await fetch('/api/getaccounts' , {
          method:"POST" ,
          body:JSON.stringify({
            access_token :finaldata.data[0].accessToken
          })
        })
        const finalaccounts = await accounts.json() ;
        console.log(finalaccounts)
        setBankAccount(finalaccounts.data)
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