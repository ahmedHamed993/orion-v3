"use server";
import { Meta } from "@/types/types";
import { getBaseUrl } from "./actions/getBaseUrl";
type GetMeta = () => Promise<Meta | null>;
export const getMeta: GetMeta = async () => {
  const baseUrl = await getBaseUrl();
  try {
    const response = await fetch(`${baseUrl}/meta`);
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};
