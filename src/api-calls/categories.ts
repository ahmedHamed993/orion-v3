"use server";

import { Categories, Category } from "@/types/types";
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

export const getAllCategories = async () => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/categories?filters=depth:gt:1&all`);
    // const response = await fetch(`${process.env.BASE_URL}/categories?all`);
    const data = await response.json();
    const final = structureCategories(data.data);
    return final;
  } catch (error) {
    return null;
  }
};

export const structureCategories = async (categories: Category[]) => {
  const categoryMap = new Map();

  // First, create a map of all categories
  categories?.forEach((category) => {
    categoryMap.set(category.id, {
      id: category.id,
      name: category.name,
      children: [],
    });
  });

  const final: any[] = [];

  categories?.forEach((category) => {
    if (category.parent_id && category.parent_id !== category.id) {
      // If the category has a parent, push it into its parent's children array
      const parentCategory = categoryMap.get(category.parent_id);
      if (parentCategory) {
        parentCategory.children.push(categoryMap.get(category.id));
      }
    } else {
      // If it has no valid parent, it is a root category
      final.push(categoryMap.get(category.id));
    }
  });

  return final;
};
