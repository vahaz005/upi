import { tr } from 'date-fns/locale';
import { Schema, model, Document } from 'mongoose';
import mongoose from "mongoose"

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  postalCode: string;
  state: string;
  ssn: string;
  dateOfBirth: string;
  address: string;
  dwollaCustomerURL:string ;
  dwollaCustomerID :string ;
  VerifyCode:string ;
  VerifyCodeExpiry:Date ;
  isVerified:boolean ;
  
}
export interface IuserS {
 
  firstName: string;
  lastName: string;
  email: string;
 
  address1: string;
  city: string;
  state:string;

  postalCode: string;
  dateOfBirth: string;
  ssn: string;

}

const userSchema = new Schema<IUser>({
  fullName: { type: String, required: true , unique:true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  postalCode: { type: String, required: true },
  state: { type: String, required: true },
  ssn: { type: String, required: true, unique: true },
  dateOfBirth: { type: String, required: true },
  address: { type: String, required: true },
  dwollaCustomerURL:{
    type:String
  } ,
  dwollaCustomerID:{
    type:String
  } ,
  

  VerifyCode:{
    type:String  ,
    required:true
  }, 
  VerifyCodeExpiry:{
    type:Date
  } ,
  isVerified:{
    type :Boolean ,
    default:false ,
} }
);

const User = mongoose.models.User as mongoose.Model<IUser> ||



mongoose.model<IUser>('User', userSchema);

export default User;