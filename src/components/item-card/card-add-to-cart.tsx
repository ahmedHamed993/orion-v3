"use client";
import React, { useEffect, useState } from "react";
// icons
import { MdAddShoppingCart } from "react-icons/md";
import { FiPlus, FiMinus } from "react-icons/fi";
// libs
import { getContrastColor } from "@/lib/getContrastColor";
// types
import { Item } from "@/types/types";
// next-auth
import { useSession } from "next-auth/react";
// components
import LoginDialog from "../login-dialog/login-dialog";
// lib
import { getBaseUrl } from "@/api-calls/actions/getBaseUrl";
import { toast } from "react-toastify";
import { fireAlert } from "@/lib/fireAlert";
type Props = {
  item: Item;
  primaryColor: string;
  variant?: "default" | "quantity";
};

const CardAddToCart = ({ item, primaryColor, variant = "default" }: Props) => {
  const { data: session, status } = useSession();
  const primaryColorContrast = getContrastColor(primaryColor);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  // const [baseUrl, setBaseUrl] = useState("");
  const incQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  const decQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  const handleAddToCart = async () => {
    const baseUrl = await getBaseUrl();
    if (!session?.user.accessToken) {
      setOpenLoginDialog(true);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/cart/add`, {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          item_id: item.id,
          quantity: quantity,
        }),
      });
      const data = await response.json();
      fireAlert("تم اضافة المنتج الي السلة", "success");
      setLoading(false);
      return;
    } catch (error) {
      fireAlert(
        (error as any)?.message?.toString() ||
          (error as any)?.messages?.[0]?.toString() ||
          "Try Again",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };
  if (variant === "default") {
    return (
      <>
        <button
          onClick={handleAddToCart}
          className=" py-2 rounded-md font-semibold flex justify-center items-center gap-4 w-10 h-10 shadow-md"
          style={{ backgroundColor: primaryColor, color: primaryColorContrast }}
        >
          {loading ? (
            <span
              className="loader"
              style={{ border: `3px solid ${getContrastColor(primaryColor)}` }}
            ></span>
          ) : (
            <MdAddShoppingCart size={20} />
          )}
        </button>
        <LoginDialog open={openLoginDialog} setOpen={setOpenLoginDialog} />
      </>
    );
  }
  return (
    <>
      <div className="flex justify-start gap-2 min-h-12">
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
            <MdAddShoppingCart size={20} />
          )}
        </button>
      </div>
      <LoginDialog open={openLoginDialog} setOpen={setOpenLoginDialog} />
    </>
  );
};

export default CardAddToCart;
