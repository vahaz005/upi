import dbConnect from "@/lib/dbConnect";
import { addFundingSource } from "@/lib/dwoll-V2";
import { client } from "@/lib/plaid";
import { encryptId } from "@/lib/utils";
import { BankAccount } from "@/models/BankAccount";
import User from "@/models/User";
import { AwardIcon } from "lucide-react";
import { ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum } from "plaid";


export async function POST(request:Request) {
    await dbConnect()
    const {Public_Token , userID} = await request.json()  ;
try {
const user = await User.findById(userID) ;
if(!user){
    return Response.json({
        success:false ,
        message:"user not found" ,
    } , 
{
    status:404
})
}
console.log(user)
console.log(client)
    const response = await client.itemPublicTokenExchange({
        public_token:Public_Token
    })
    console.log("response" , response)
    const accessToken  = response.data.access_token ;
    const itemID = response.data.item_id ;
    const accountResponse = await client.accountsGet({
        access_token:accessToken
    })
    console.log( "accountResponse" , accountResponse)
    const accountDATA  = accountResponse.data.accounts[0];
    console.log( "accountData" , accountDATA)

    const request :ProcessorTokenCreateRequest= {
        access_token:accessToken ,
        account_id:accountDATA.account_id,
        processor:"dwolla" as ProcessorTokenCreateRequestProcessorEnum
    }
    const processTokenresponse = await client.processorTokenCreate(request) ;
    const processToken = processTokenresponse.data.processor_token ;
    const fundingSourseURL =  await addFundingSource({
        dwollaCustomerId:user.dwollaCustomerID , 
        processorToken:processToken,
        bankName:accountDATA.name
 
        
    })
    if(!fundingSourseURL){
        return Response.json({
            success:false ,
            message:"failed to create fundind"
        } ,
    {
        status:400
    })
    }
    const newAccount = new BankAccount({
        userID:user._id ,
        bankID:itemID ,
        accountID:accountDATA.account_id ,
        accessToken:accessToken ,
        fundingSourceURL:fundingSourseURL,
        sharableURL:encryptId(accountDATA.account_id)


    })
    const savedaccount = await newAccount.save() ;
    return Response.json({
        success:true ,
        message:"public Token exchanged",
        data:savedaccount ,
        accessToken:accessToken
    } ,
{
    status:200
})

    
} catch (error:any) {
    return Response.json({
        success:false,
        massage:error.message
    } , {
        status:500
    })
    
}


    
}