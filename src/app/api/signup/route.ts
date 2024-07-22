import User, { IUser, IuserS } from "@/models/User";
import bcryptjs from "bcryptjs"
import dbConnect from "@/lib/dbConnect";
import { sendEmail } from "@/helpers/sendEmail";
import { Save } from "lucide-react";
import { createDwollaCustomer } from "@/lib/dwoll-V2";
import { use } from "react";
import { stat } from "fs";
import { extractCustomerIdFromUrl, formatDateTime, getAbbreviation } from "@/lib/utils";
import { da } from "date-fns/locale";
dbConnect()
export async function POST(request:Request) {
    

   try {
     const { fullName,email,password,address,postalCode,ssn,dateOfBirth ,state } = await request.json() ;
     //finding 
   
     const statef= getAbbreviation(state)

     const userData :IuserS = {
        
     firstName:fullName ,
     lastName:'HORIZON' ,
     address1:address ,
     city:state ,
     state:statef ,
    
     postalCode:postalCode,
     ssn:ssn ,
     dateOfBirth:dateOfBirth,
     email:email

       

     }
     
    const dwollaCustomerUrl = await createDwollaCustomer({
        
          ...userData ,

        
        type: 'personal'
      })
      console.log(dwollaCustomerUrl) ;
  
      if(!dwollaCustomerUrl) throw new Error('Error creating Dwolla customer')
  
      const dwollaCustomerId =  extractCustomerIdFromUrl(dwollaCustomerUrl);
      
      console.log(dwollaCustomerId)
      
     const existingUser = await User.findOne({email:email}) ;
     if(existingUser){
         return Response.json({
             success:false ,
             message:"User already exist"
 
         } ,
      {
         status:400
      })
     }
     const VerifyCode = Math.floor(100000 + Math.random() * 900000).toString() ;
     const salt = await bcryptjs.genSalt(10)
     const hashedPassword = await bcryptjs.hash(password, salt)
   
     const expiryDate = new Date() ;
     expiryDate.setHours(expiryDate.getHours()+1) ;
 
      const newUser = new User({
         fullName ,
         email , 
         password:hashedPassword , 
         state  , 
         postalCode ,
         dateOfBirth:dateOfBirth ,
         ssn ,
         address ,
         VerifyCode:VerifyCode ,
         VerifyCodeExpiry:expiryDate,
         dwollaCustomerID:dwollaCustomerId ,
         dwollaCustomerURL:dwollaCustomerUrl
 
         
      })
   const saveUser =    await newUser.save() ;

      const emailResponse =  await sendEmail(email , fullName, VerifyCode);
      const finalResposne = await emailResponse.json()
if(!finalResposne.success){
    return Response.json({
        success:false ,
        message:finalResposne.message  ,

    } , {status:500})
}



      return Response.json({
         success:true  ,
         message:"user registered successfully" ,
         data:saveUser
      } , 
     {
         status:200
     })
    
     
   } catch (error:any) {
    console.log(error.massage);
    return Response.json({
        success:false ,
        message:error.message || "error in catch Part while Registering"
    }  ,
{
    status:500
})
    
   }


    
}

