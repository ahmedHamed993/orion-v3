import { Items } from "@/types/types";

type GetItems = (page: number, paginate: number) => Promise<Items | null>;
export const getItems: GetItems = async (page, paginate) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/items?page=${page}&paginate=${paginate}`,
    );
    const data = await response.json();
    console.log("get", data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getItemsWithFilters = async (
  filters: Record<string, number | string | string[] | number[]>,
): Promise<Items | null> => {
  if (!filters.page) filters["page"] = 1;
  if (!filters.paginate) filters["paginate"] = 12;
  let endpoint = `${process.env.BASE_URL}/items?`;
  const query = convertSearchParamsToQuery(filters);
  endpoint += query;
  console.log("items endpoint", endpoint);
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const getItemById = async (itemId: string) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/items/${itemId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

const convertSearchParamsToQuery = (
  searchParams: Record<string, number | string | string[] | number[]>,
): string => {
  const filtersKeyWord = ["categories", "categories_id"];
  const query: (number | string)[] = [];
  const filters: (number | string)[] = [];
  for (let i in searchParams) {
    // values is a string and not set to filters keyword
    if (typeof searchParams[i] === "string" && !filtersKeyWord.includes(i)) {
      query.push(`${i}=${searchParams[i]}`);
    }
    // values is a string and  set to filters keyword
    if (typeof searchParams[i] === "string" && filtersKeyWord.includes(i)) {
      filters.push(`${i}=${searchParams[i]}`);
    }
    // values is a string and  set to filters keyword
    if (Array.isArray(searchParams[i]) && filtersKeyWord.includes(i)) {
      filters.push(`${i}=${searchParams[i].join("|")}`);
    }
  }
  return [...query, ...filters].join("&");
};
