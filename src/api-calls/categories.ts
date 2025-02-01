import { Categories } from "@/types/types";
type GetCategories = (str?: string) => Promise<Categories | null>;
export const getCategories: GetCategories = async (filterStr: string = "") => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/categories${filterStr}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};
