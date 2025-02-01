import { Item } from "@/types/types";
import React from "react";
import CardAddToCart from "./card-add-to-cart";
import { getMeta } from "@/api-calls/meta";
import Link from "next/link";

type Props = {
  item: Item;
};

const ItemCard = async ({ item }: Props) => {
  const meta = await getMeta();
  const primaryColor = meta?.vendor?.color_primary;
  return (
    <div className="shadow-md rounded-md border-[1px] border-slate-200 p-2 flex flex-col">
      <img
        src={item?.img}
        style={{ aspectRatio: "4/3", width: "100%", objectFit: "contain" }}
        alt={item.name}
      />
      <div className="p-2 flex flex-col flex-1 relative">
          <div className="absolute -top-14 left-1">
            <CardAddToCart item={item} primaryColor={primaryColor || "#333"} />
          </div>
        <Link
          href={`/items/${item?.id}`}
          className="flex justify-between items-center gap-4 mb-2"
          title={item.name}
        >
          <h6 className="truncate font-semibold">{item.name}</h6>
          <p className="font-bold text-md min-w-fit">{item.final_price} د.ل</p>
        </Link>
        <div className="flex flex-col justify-between flex-1 gap-2">
          <Link href={`/items/${item?.id}`} className=" line-clamp-2 ">
            {item.description}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
