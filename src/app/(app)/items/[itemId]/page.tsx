import React from "react";
// api calls
import { getItemById } from "@/api-calls/items";
// components
import NoItems from "@/components/no-items/no-items";
import Image from "next/image";
import ItemImages from "./components/item-images";
import { Item, MetaData } from "@/types/types";
import Link from "next/link";
import CardAddToCart from "@/components/item-card/card-add-to-cart";
import { getMeta } from "@/api-calls/meta";
// types
type Props = {
  params: {
    itemId: string;
  };
};
const ItemDetails = async ({ params }: Props) => {
  const { itemId } = params;
  const item: Item = await getItemById(itemId);
  const meta = await getMeta();
  if (!item) return <NoItems />;
  return (
    <div className="py-8">
      <div className="container px-2">
        <div className="flex gap-8 flex-col md:flex-row">
          <ItemImages image={item.img} images={item.images} />
          <div className="flex-1">
            {/* name price  */}
            <div className="flex items-center justify-between">
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
            <CardAddToCart item={item} primaryColor={meta?.vendor.color_primary || "#333"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
