import dbConnect from "@/lib/dbConnect";
import { BankAccount } from "@/models/BankAccount";
import User from "@/models/User";
import mongoose from "mongoose";


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
    return Response.json({
        success:true ,
        message:"successfully fetched BankAccount" ,
        data:account
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