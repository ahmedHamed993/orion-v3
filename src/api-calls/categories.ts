"use server";

import { Categories, Category } from "@/types/types";
import { getBaseUrl } from "./actions/getBaseUrl";
type GetCategories = (str?: string) => Promise<Categories | null>;
export const getCategories: GetCategories = async (filterStr: string = "") => {
  const baseUrl = await getBaseUrl();
  try {
    const response = await fetch(
      `${baseUrl}/categories${filterStr}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const getAllCategories = async () => {
  const baseUrl = await getBaseUrl();
  try {
    const response = await fetch(
      `${baseUrl}/categories?filters=depth:gte:2&all`,
    );
    const data = await response.json();
    const final = buildHierarchy(data.data);
    return final;
  } catch (error) {
    return null;
  }
};

export const structureCategories = async (categories: Category[]) => {
  const categoryMap = new Map();
  // Initialize the map with all categories
  categories.forEach((category) => {
    categoryMap.set(category.id, { ...category, children: [] });
  });

  // Build the nested structure
  const nestedCategories: any = [];
  categories.forEach((category) => {
    const parentId = (category as any).parent?.id;

    if (parentId) {
      // If the category has a parent, add it to the parent's children array
      const parent = categoryMap.get(parentId);
      if (parent) {
        parent.children.push(categoryMap.get(category.id));
      }
    } else {
      // If the category has no parent, it's a root category
      nestedCategories.push(categoryMap.get(category.id));
    }
  });

  return nestedCategories;
};

interface Item {
  id: string;
  name: string;
  img: string | null;
  thumb: string | null;
  depth: number;
  sort: number;
  is_disabled: boolean;
  is_featured: boolean;
  spiza_id: string | null;
  created_at: string;
  updated_at: string;
  parent: {
    id: string | null;
    name: string | null;
  };
  super_parent: {
    id: string | null;
    name: string | null;
  };
  vendor: {
    id: string | null;
    slug: string | null;
    name: string | null;
  };
  children?: Item[];
}

function buildHierarchy(items: Item[]): Item[] {
  const itemMap: { [key: string]: Item } = {};
  const roots: Item[] = [];

  // Create a map of items by their id
  items.forEach((item) => {
    itemMap[item.id] = { ...item, children: [] };
  });

  // Build the hierarchy
  items.forEach((item) => {
    if (item.parent.id && itemMap[item.parent.id]) {
      itemMap[item.parent.id].children!.push(itemMap[item.id]);
    } else {
      roots.push(itemMap[item.id]);
    }
  });

  return roots;
}
