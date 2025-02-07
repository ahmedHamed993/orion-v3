'use server'
import { getServerSession } from "next-auth";
import { getBaseUrl } from "../actions/getBaseUrl";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export const getCart = async () => {
try {
  const baseUrl = await getBaseUrl();
  const session = await getServerSession(authOptions);
    const response = await fetch(`${baseUrl}/cart`, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
};
