"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { getBaseUrl } from "../actions/getBaseUrl";
export const getUserOrders = async () => {
  const session = await getServerSession(authOptions);
  const baseUrl = await getBaseUrl();
  try {
    const response = await fetch(`${baseUrl}/orders?all`, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    // console.log(error)
    // return null;
    throw error;
  }
};
