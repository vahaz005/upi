import dbConnect from "@/lib/dbConnect";
import { client } from "@/lib/plaid";
import { AwardIcon } from "lucide-react";

export async function POST(request:Request) {
    await dbConnect()
 try {
       const {access_token} = await request.json() ;
       const response = await client.accountsGet({
           access_token:access_token
       })
       const accounts = await  response.data.accounts; 
       console.log("Responses",response)
       const institutionID  = await response.data.item.institution_id;
   
       return Response.json({
       success:true ,
       message:"succesfully fetched accounts" ,
       data:accounts ,
       institutionID:institutionID
       }  ,
   {
       status:200
   })
 } catch (error:any) {
    return Response.json({
        success:false ,
        message:error.message 
    } ,{
        status:500
    })
    
 }
    
    
    
}