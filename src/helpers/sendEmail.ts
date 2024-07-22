import resend from "@/lib/resend" 
import VerificationEmail from "../../email/VerificationEmail" 


export async function sendEmail(
    email:string , 
    username:string , 
    otp:string

) { 
    try {
        await resend.emails.send({
            from: 'Acme <vahaz@resend.dev>',
            to: email ,
            subject: 'Hello',
            react: VerificationEmail({username:username , otp:otp})
          });
     return Response.json({
        success:true ,
        message:"email send successfully"
     })
        
    } catch (error) {

        console.log("error sending verification email") ;
        return Response.json({
            success:false , 
            message:"error while sending mail"
        })
    }
    
}


