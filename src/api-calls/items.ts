import { Items } from "@/types/types";
import { getBaseUrl } from "./actions/getBaseUrl";

type GetItems = (page: number, paginate: number) => Promise<Items | null>;
export const getItems: GetItems = async (page, paginate) => {
  const baseUrl = await getBaseUrl();
  try {
    const response = await fetch(
      `${baseUrl}/items?page=${page}&paginate=${paginate}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getItemsWithFilters = async (
  filters: Record<string, number | string | string[] | number[]>,
): Promise<Items | null> => {
  const baseUrl = await getBaseUrl();
  if (!filters.page) filters["page"] = 1;
  if (!filters.paginate) filters["paginate"] = 12;

  let endpoint = `${baseUrl}/items?`;
  const query = convertSearchParamsToQuery(filters);
  endpoint += query;
  console.log("endpoint",endpoint)

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const getItemById = async (itemId: string) => {
  const baseUrl = await getBaseUrl();
  try {
    const response = await fetch(`${baseUrl}/items/${itemId}`);
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
  console.log("searchParams", searchParams)
  for (let i in searchParams) {
    // values is a string and not set to filters keyword
    if (typeof searchParams[i] === "string" && !filtersKeyWord.includes(i)) {
      query.push(`${i}=${searchParams[i]}`);
    }
    // values is a string and  set to filters keyword
    if (typeof searchParams[i] === "string" && filtersKeyWord.includes(i)) {
      filters.push(`${i}:${searchParams[i]}`);
    }
    // values is a string and  set to filters keyword
    if (Array.isArray(searchParams[i]) && filtersKeyWord.includes(i)) {
      filters.push(`${i}:${searchParams[i].join("|")}`);
    }
  }
  const fFilters = "filters="+filters.join(",");
  return query.join("&")+"&"+fFilters;
};
