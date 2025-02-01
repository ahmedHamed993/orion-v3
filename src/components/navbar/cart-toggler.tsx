"use client";

import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Cart from "../cart/cart";

const CartToggler = () => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleCart = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <button onClick={toggleCart} className="flex items-center gap-2">
        <span className="hidden md:inline">السلة</span>
        <ShoppingCart />
      </button>
      <Cart open={open} setOpen={setOpen} />
    </>
  );
};

export default CartToggler;
