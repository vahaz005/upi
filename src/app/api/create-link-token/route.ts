import { client } from "@/lib/plaid";
import { AirVent, AwardIcon } from "lucide-react"
import { CountryCode, Products } from "plaid";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export async  function POST(request:Request) {
    await dbConnect()
    const { userID } =  await request.json();
     // The user ID should come from your auth system
     const user = await User.findById(userID) ;
     if(!user){
        return Response.json({
            success:false ,
            message:"failed to found User"
        } ,
    {
        status:404
    })
     }
     console.log(user)

    const requests = {
      user: { client_user_id: userID },
      client_name: user?.fullName ,
      products: ['transactions','auth'] as Products[],
      country_codes: ['US']  as CountryCode[],
      language: 'en',
    };
    console.log(requests)
    try {
        const response = await client.linkTokenCreate(requests) ;
        return Response.json({
            success:true ,
            message:"token created succssfully",
            data:response.data.link_token

        } , 
    {
        status:200
    })
        
    } catch (error:any) {
        console.log(error.message)
        return Response.json({
            success:false ,
            message:error.message || "somthing went wrong while generating token"
        },  
    {
        status:500
    })
        
    }
}