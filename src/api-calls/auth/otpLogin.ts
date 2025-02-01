export const otpLogin = async (phone: string, otp: string) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/otp/login`, {
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
