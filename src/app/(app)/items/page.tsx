import React from "react";
// components
import ItemsFilters from "./components/items-filters";
import ItemCard from "@/components/item-card/item-card";
// api call
import { getItems, getItemsWithFilters } from "@/api-calls/items";
// types
import { Item, Items } from "@/types/types";
import Filters from "./components/filters";
import { getMeta } from "@/api-calls/meta";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import NoItems from "@/components/no-items/no-items";
import { getAllCategories, structureCategories } from "@/api-calls/categories";

const ItemsList = async ({ searchParams }: { searchParams: any }) => {
  const params = await searchParams;
  const meta = await getMeta();
  const items: Items = await getItemsWithFilters(params);

  return (
    <div className="bg-slate-50 relative">
      <div className="container flex gap-8 relative x-4 md:px-8 py-2">
        <Filters primaryColor={meta?.vendor?.color_primary || ""} />
        <div className="flex-1 py-8">
          <h2 className="font-bold text-2xl">المنتجات</h2>
          {items && !items?.data?.length ? (
            <NoItems />
          ) : (
            <div
              className="grid gap-2 md:gap-4 py-8"
              style={{
                gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))",
              }}
            >
              {items &&
                items?.data?.map((item: Item) => (
                  <ItemCard item={item} key={item.id} />
                ))}
            </div>
          )}
          <PaginationWithLinks
            page={Number(params["page"]) || 1}
            totalCount={items?.meta.total || 1}
            pageSize={items?.meta.per_page || 1}
          />
          <div className="h-12 block lg:hidden"></div>
        </div>
      </div>
    </div>
  );
};

export default ItemsList;
