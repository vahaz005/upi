import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { verify } from 'crypto';

export async function POST(request: Request) {
  // Connect to the database
  await dbConnect();

  try {
    
  
    const { id, newcode } = await request.json();
 
   
    const user = await User.findById(id);
    console.log( newcode)

    if (!user) {
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Check if the code is correct and not expired
    console.log( "users code" , user.VerifyCode) ;
    console.log("user input code" , newcode)
    const isCodeValid = user.VerifyCode === newcode
    const isCodeNotExpired = new Date(user.VerifyCodeExpiry) > new Date();

    if (!isCodeValid) {
      // Update the user's verification status
      
      return Response.json(
        { success: false, message: 'Incorrect verification code' },
        { status: 400 }
      );
    } 
    if(!isCodeNotExpired){
      return Response.json({
        success:false ,
        message:"verification code expired" 
      } , {
        status:404
      })
    }
   user.isVerified = true
      await user.save(); 
      return Response.json({
        success:true ,
        message:"user verified successfully" 
      } , {
        status:200
      })


    
  } catch (error) {
    console.error('Error verifying user:', error);
    return Response.json(
      { success: false, message: 'Error verifying user' },
      { status: 500 }
    );
  }
}