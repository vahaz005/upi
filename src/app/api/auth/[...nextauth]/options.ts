import dbConnect from "../../../../lib/dbConnect"
import User from "../../../../models/User"
import NextAuth, { NextAuthOptions } from "next-auth"
import bcryptjs from "bcryptjs"
import CredentialsProvider from 'next-auth/providers/credentials';
import { use } from "react";


// Your own logic for dealing with plaintext password strings; be careful!

export const authoptions :NextAuthOptions = {
  providers: [
    
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: 'email', type: 'text', placeholder: ' Email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials:any):Promise<any> => {
        console.log("vahaz")
        await dbConnect() ;
        try {
          console.log(credentials.email, "username while credentials testing")
         const newuser  =    await User.findOne({
                
                   
                    email:credentials.email
                
            })
            if(!newuser){
                throw new Error("No USER FOUND") ;

            }
         

   const isPassword =     await     bcryptjs.compare( credentials.password ,newuser.password ) 
   if(isPassword){
    console.log(newuser)
    return newuser;
    
   } else {
    throw new Error("incorrect Password") ;
   }

            
        } catch (error:any) {
            throw new Error(error)
            
        }

       
      },
    }),
  ], callbacks:{
    async jwt({ token, user }) {
      console.log("i am here")
      if (user) {
        token.id = user.id?.toString(); // Convert ObjectId to string
        token.fullName =  user?.fullName ;
        token.address = user?.address ;
        token.dateOfBirth = user?.dateOfBirth ;
        token.ssn = user?.ssn ;
        token.postalCode = user?.postalCode ;
        token.state = user?.state ;
        token.email = user?.email ;

      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.state = token.state;
        session.user.postalCode = token.postalCode;
        session.user.fullName = token.fullName;
        session.user.address = token.address ;
        session.user.email = token.email ;
        session.user.ssn = token.ssn; 
        session.user.dateOfBirth = token.dateOfBirth ;

      }
      return session;
    },

  } ,
  pages:{
    signIn:'/signin'
  } ,
  session:{
    strategy:'jwt'
  } ,
  secret:process.env.TOKEN_SECRET
}


