// components/PlaidLink.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { usePlaidLink, PlaidLinkOptions } from 'react-plaid-link';
import { Button, ButtonProps } from './ui/button';
import { useRouter } from 'next/navigation';

interface PlaidLinkProps {
  userId: string;
  type:string;
  variant?:"default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
  
 
}

interface PlaidLinkMetadata {
  institution: string;
  institution_id: string;
  link_session_id: string;
  public_token: string;
}

const PlaidLink = ({ userId , type , variant }:PlaidLinkProps) => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const router = useRouter()

  useEffect(() => {
    const createLinkToken = async () => {
      try {
        const response = await fetch('/api/create-link-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userID: userId }),
        });
        const finaldata = await response.json();
        setLinkToken(finaldata.data);

      } catch (error) {
        console.error('Error creating link token:', error);
      }
    };

    createLinkToken();
  }, [userId]);
  const handleSuccess = useCallback(async (publicToken: string) => {
    try {
      console.log("public Token" , publicToken)
      const response = await fetch('/api/exchange-publicToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  Public_Token: publicToken ,
          userID:userId
         }),
      });
      const finaldata = await response.json();
      console.log(finaldata?.accessToken)
      router.push(`/dashboard/${userId}`)
     
    } catch (error) {
      console.error('Error exchanging public token:', error);
    }
  }, [userId]);

  const { open, ready } = usePlaidLink({
    token: linkToken || '',
    onSuccess: handleSuccess
    
  
      // Handle Plaid Link exit event if necessary
    
  });

  return (
    <Button variant={variant} onClick={() => open()} disabled={!ready}>
      {
        type == 'Link' 
        ?
      
        'Link Bank Account to start your journey'
        :
        'Add BankAccount'
        
}
     
    </Button>
  );
};

export default PlaidLink;
