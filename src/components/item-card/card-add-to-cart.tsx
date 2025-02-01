"use client";
import { Item } from "@/types/types";
import React, { useState } from "react";
import { ShoppingCart, ScrollText, User, Plus, Minus } from "lucide-react";
import { getContrastColor } from "@/lib/getContrastColor";

type Props = {
  item: Item;
  primaryColor: string;
};

const CardAddToCart = ({ item, primaryColor }: Props) => {
  const primaryColorContrast = getContrastColor(primaryColor);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const incQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  const decQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  const handleAddToCart = () => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve(true);
      }, 4000);
    });
  };

  return (
    <>
      {/* <button className='w-full py-2 rounded-md font-semibold flex justify-center items-center gap-4' style={{backgroundColor:primaryColor, color:primaryColorContrast}}>
      <ShoppingCart />
      <span>اضف الي السلة</span>
    </button> */}
      <div className="flex justify-start gap-2">
        <div className="w-fit flex border-[1px] border-slate-200 flex-1 rounded-md">
          <button
            className="bg-slate-100 min-w-12 flex justify-center items-center"
            onClick={incQuantity}
          >
            <Plus />
          </button>
          <input
            type="number"
            className=" text-center w-12 flex-1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <button
            className="bg-slate-100 min-w-12 flex justify-center items-center"
            onClick={decQuantity}
          >
            <Minus />
          </button>
        </div>
        <button
          className=" w-12 min-w-12 py-2 rounded-md font-semibold flex justify-center items-center gap-4"
          style={{ backgroundColor: primaryColor, color: primaryColorContrast }}
          onClick={handleAddToCart}
        >
          {loading ? (
            <span
              className="loader"
              style={{ border: `3px solid ${getContrastColor(primaryColor)}` }}
            ></span>
          ) : (
            <ShoppingCart />
          )}
        </button>
      </div>
    </>
  );
};

export default CardAddToCart;
