import NextAuth from "next-auth";
import { authoptions } from "../[...nextauth]/options"
const handlers =NextAuth(authoptions) ;
export {handlers as GET  , handlers as POST}





