"use server";
export const getOtp = async (phone: string) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/otp/request`, {
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
