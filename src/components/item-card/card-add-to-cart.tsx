"use client";
import React, { useState } from "react";
// icons 
import { MdAddShoppingCart } from "react-icons/md";
import { FiPlus,FiMinus } from "react-icons/fi";
// libs 
import { getContrastColor } from "@/lib/getContrastColor";
// types 
import { Item } from "@/types/types";
type Props = {
  item: Item;
  primaryColor: string;
  variant?:"default"|"quantity"
};

const CardAddToCart = ({ item, primaryColor, variant = 'default'}: Props) => {
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
  if(variant === 'default') {
    return (
      <button 
      onClick={handleAddToCart}
      className=' py-2 rounded-md font-semibold flex justify-center items-center gap-4 w-10 h-10 shadow-md' style={{backgroundColor:primaryColor, color:primaryColorContrast}}>
       {loading ? (
            <span
              className="loader"
              style={{ border: `3px solid ${getContrastColor(primaryColor)}` }}
            ></span>
          ) : (
            <MdAddShoppingCart size={20} />
          )}
      </button>
    )
  }
  return (
    <>
      <div className="flex justify-start gap-2">
        <div className="w-fit flex border-[1px] border-slate-200 flex-1 rounded-md">
          <button
            className="bg-slate-100 min-w-12 flex justify-center items-center"
            onClick={incQuantity}
          >
            <FiPlus />
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
            <FiMinus />
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
            <MdAddShoppingCart />
          )}
        </button>
      </div>
    </>
  );
};

export default CardAddToCart;
