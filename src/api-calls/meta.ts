"use server";
import { Meta } from "@/types/types";
type GetMeta = () => Promise<Meta | null>;
export const getMeta: GetMeta = async () => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/meta`);
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    return null;
  }
};
