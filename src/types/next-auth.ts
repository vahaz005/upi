import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
        id?:string;

        fullName?: string;
        email?: string;
      
        postalCode?: string;
        state?: string;
        ssn?: string;
        dateOfBirth?: Date;
        address?: string;
    } & DefaultSession['user']
  }

  interface User {
    id?:string;

    fullName?: string;
    email?: string;
  
    postalCode?: string;
    state?: string;
    ssn?: string;
    dateOfBirth?: Date;
    address?: string;
    }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?:string;
    fullName?: string;
    email?: string;
 
    postalCode?: string;
    state?: string;
    ssn?: string;
    dateOfBirth?: Date;
    address?: string;
  }
}