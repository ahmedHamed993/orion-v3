import { getBaseUrl } from "../actions/getBaseUrl";

export const otpLogin = async (phone: string, otp: string) => {
  const baseUrl = await getBaseUrl();
  try {
    const response = await fetch(`${baseUrl}/otp/login`, {
      method: "POST",
      body: JSON.stringify({ phone: phone, pin: otp }),
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
