

import { verify } from "crypto";
import {z} from "zod" 

const VerifyCode = z.string().min(6 ,  "verify code must be of 6 characters").max(6 ,  "verify code must be of 6 characters")
const VerifySchema = z.object({
  verifyCode:VerifyCode
})

const SignUpSchema = z.object({
  fullName: z.string().min(1, "Full name is required")
  .max(20 , "Full name must not be more than"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  postalCode: z.string().min(5, "Postal code must be at least 5 characters long").max(5 , "postal code must be of 5 characters"),
  state: z.string().min(1, "State is required"),
  ssn: z.string().regex(/^\d{3}-\d{2}-\d{4}$/, "Invalid SSN format"),
  dateOfBirth: z.string().refine((dateString) => {
    // Check if the date string matches the format YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regex)) {
      return false;
    }
  
    // Parse the date components
    const [year, month, day] = dateString.split('-').map(Number);
  
    // Check if the date components are valid
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() + 1 === month &&
      date.getDate() === day
    );
  }, {
    message: "Invalid date of birth format. Please use YYYY-MM-DD."
  }) ,
  
  // Example usage:
  
  address: z.string().min(10, "Address must be atleast of 10 characters").max(50 ,  "address must be 50 fo fewer characters")

  
});

type IUserSchema = z.infer<typeof SignUpSchema>;
type IVerifySchema = z.infer<typeof VerifySchema>

export {SignUpSchema , VerifyCode  , VerifySchema};    export type { IUserSchema  , IVerifySchema };
