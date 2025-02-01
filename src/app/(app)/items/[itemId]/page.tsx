import React from "react";
// api calls
import { getItemById } from "@/api-calls/items";
import { getMeta } from "@/api-calls/meta";
// components
import NoItems from "@/components/no-items/no-items";
import ItemImages from "./components/item-images";
import CardAddToCart from "@/components/item-card/card-add-to-cart";
// next 
import Image from "next/image";
import Link from "next/link";
// types 
import { Item, MetaData } from "@/types/types";

// types
type Props = {
  params: Promise<{
    itemId: string;
  }>;
};
const ItemDetails = async ({ params }: Props) => {
  const { itemId } = await params;
  const item: Item = await getItemById(itemId);
  const meta = await getMeta();

  if (!item) return <NoItems />;
  return (
    <div className="py-8">
      <div className="container px-2">
        <div className="flex gap-8 flex-col md:flex-row">
          <div className="flex flex-col gap-4">
            <ItemImages image={item.img} images={item.images} />
            <CardAddToCart item={item} primaryColor={meta?.vendor.color_primary || "#333"} />
          </div>
          <div className="flex-1">
            {/* name price  */}
            <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row">
              <h1 className="text-lg font-bold">{item.name}</h1>
              <h2 className="text-xl font-bold">{item.final_price} د.ل</h2>
            </div>
            {/* categories  */}
            <div className="my-2 overflow-x-auto">
              {item.categories.map(cat => <Link key={cat.id} href={`/items?page=1&paginate=12&categories=${cat.id}`} className="bg-slate-200 rounded-full text-xs px-2 text-slate-950 ">{cat.name}</Link>)}
            </div>
            {/* description  */}
            <div className="">
              {item.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
