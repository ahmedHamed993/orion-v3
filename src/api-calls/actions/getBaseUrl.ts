"use server";
import { headers } from "next/headers";
export const getBaseUrl = async () => {
  const reqHeaders = await headers();
  const store = reqHeaders.get("host")?.split(".")?.[0];
  if(store){
    return `https://${store}.sadeem-orion.com/api/v3`
  }
  return process.env.BASE_URL;
};
