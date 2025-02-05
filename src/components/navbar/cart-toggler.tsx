"use client";

import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Cart from "../cart/cart";

const CartToggler = ({color}:{color:string}) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleCart = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <button onClick={toggleCart} className="flex items-center gap-2" style={{color:color}}>
        <span className="hidden md:inline">السلة</span>
        <AiOutlineShoppingCart />
      </button>
      <Cart open={open} setOpen={setOpen} />
    </>
  );
};

export default CartToggler;
