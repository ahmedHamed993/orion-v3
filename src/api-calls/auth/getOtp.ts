"use server";

import { getBaseUrl } from "../actions/getBaseUrl";

export const getOtp = async (phone: string) => {
  const baseUrl = await getBaseUrl();

  try {
    const response = await fetch(`${baseUrl}/otp/request`, {
      method: "POST",
      body: JSON.stringify({ phone: phone }),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
