"use server";

import { getBaseUrl } from "../actions/getBaseUrl";

export const logout = async (token: string) => {
  const baseUrl = await getBaseUrl();
  try {
    const response = await fetch(`${baseUrl}/auth/logout`, {
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
