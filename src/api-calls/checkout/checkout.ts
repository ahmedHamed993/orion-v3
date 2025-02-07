'use server'
import { getServerSession } from "next-auth";
import { getBaseUrl } from "../actions/getBaseUrl"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export const getCheckout = async ()=>{
    const session = await getServerSession(authOptions);
    const baseUrl = await getBaseUrl();
    try {
        const response = await fetch(`${baseUrl}/cart/checkout`,{
            headers:{
                Authorization:`Bearer ${session?.user.accessToken}`
            }
        });
        const data = await response.json();
        return data;
    } catch(error){
        throw error;
    }
}