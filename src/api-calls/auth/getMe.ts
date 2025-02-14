"use server";

import { getBaseUrl } from "../actions/getBaseUrl";

export const getMe = async (token: string) => {
  const baseUrl = await getBaseUrl();
  try {
    const response = await fetch(`${baseUrl}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
