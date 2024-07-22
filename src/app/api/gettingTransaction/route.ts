import { client } from "@/lib/plaid";
import { AwardIcon } from "lucide-react";
import { TransactionsGetRequest } from "plaid";

export  async function POST(request:Request) {
 

    try {
        const { access_token } = await request.json()
        const requests: TransactionsGetRequest = {
            access_token: access_token,
            start_date: '2018-01-01',
            end_date: '2020-02-01'
          };
      const response = await client.transactionsGet(
        requests
      )
      const totalTransaction = await response.data.transactions ;
      return Response.json({
        success:true,
        message:"transaction successfully" ,
        data:totalTransaction
      } ,
    {
        status:200
    })
     
   
    } catch (error:any) {
      return Response.json({
        success:false ,
        message:error.message
      } ,
    {
        status:500
    })
    }
  };