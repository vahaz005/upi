import dbConnect from "@/lib/dbConnect";
import { client } from "@/lib/plaid";
import { BankAccount } from "@/models/BankAccount";
import User from "@/models/User";
import mongoose from "mongoose";
import { InstitutionsGetByIdRequest } from "plaid";


export async function POST(request:Request) {
    await dbConnect()

try {
        const {userID} = await request.json() ;
        console.log(userID)
        const user = await User.findById(userID)
        if(!user){
            return Response.json({
                success:false ,
                message:"failed to found user"
            } ,
        {
            status:400
        })
        }
        console.log(user)
       
        const account = await BankAccount.find({userID:user._id}) ;
        if(!account){
            return Response.json({
                success:false ,
                message:"failed to found bankAccount"
            } ,
        {
            status:404
        })
    }
console.log(account)
        const accounts = await Promise.all(
            account?.map(async (bank) => {
              // get each account info from plaid
              const accountsResponse = await client.accountsGet({
                access_token: bank.accessToken,
              });
              const accountData = accountsResponse.data.accounts[0];
              console.log(accountData)
      
              const requestinstitution: InstitutionsGetByIdRequest = {
                institution_id: accountsResponse.data.item.institution_id!,
                country_codes: [],
              };
              console.log(requestinstitution)
              // get institution info from plaid
       
              console.log("vahaz")
      
              const account = {
                id: accountData.account_id,
                availableBalance: accountData.balances.available!,
                currentBalance: accountData.balances.current!,
                access_Token : bank.accessToken ,
                fundingSourceURL:bank.fundingSourceURL ,
                // institutionId: institution.data.institution.institution_id,
                name: accountData.name,
                officialName: accountData.official_name,
                mask: accountData.mask!,
                type: accountData.type as string,
                subtype: accountData.subtype! as string,
               Bank_id:bank._id ,
                sharaebleId: bank.sharableURL,
              };
      
              return account;
            })
          );
        
          const totalBanks = accounts.length;
          const totalCurrentBalance = accounts.reduce((total, account) => {
            return total + account.currentBalance;
          }, 0);
    
    return Response.json({
        success:true ,
        message:"successfully fetched BankAccount" ,
        data:accounts ,
        totalBanks:totalBanks ,
        totalCurrentBalance:totalCurrentBalance 

    } ,
    {
    status:200
    })
} catch (error:any) {
    return Response.json({
        success:false ,
        message:error.message 
    } ,
{
    status:500
})
    
}
    
}