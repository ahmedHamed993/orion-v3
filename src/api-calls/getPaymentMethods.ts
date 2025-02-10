import { getBaseUrl } from "./actions/getBaseUrl"

export const getPaymentMethods = async ()=>{
    const baseUrl = await getBaseUrl();
    try {
        const response = await fetch(`${baseUrl}/payment-methods`);
        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
}