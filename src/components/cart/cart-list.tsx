"use client";
import React, { useEffect, useState } from "react";
// components
import CartListItem from "./cart-list-item";
import { Skeleton } from "../ui/skeleton";
// types
import { Item } from "@/types/types";
// next
import Image from "next/image";
// calls
import { getCart } from "@/api-calls/cart/getCart";

const CartList = ({ refetch }: { refetch?: () => void }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCartItems = async () => {
    const items = await getCart();
    setLoading(false);
    setItems(items?.items);
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return loading ? (
    <div className="flex flex-col divide-y-2 divide-y-slate-300 max-w-full">
      {[1, 2, 3].map((i: number) => (
        <div className="flex items-start gap-2 py-2" key={i}>
          <Skeleton className="rounded-md overflow-hidden object-cover w-[100px] h-[75px]" />
          <div>
            <div className="">
              <Skeleton className="h-4 my-2 w-[250px]" />
              <Skeleton className="h-4 my-2 w-[200px]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex flex-col divide-y-[1px] divide-y-slate-300">
      {items?.length ? (
        items.map((item: Item) => {
          return <CartListItem key={item.id} item={item} refetch={refetch} />;
        })
      ) : (
        <Image
          src="/images/empty-cart.png"
          width={200}
          height={200}
          alt="empty cart"
          className="text-center mx-auto"
        />
      )}
    </div>
  );
};

export default CartList;
