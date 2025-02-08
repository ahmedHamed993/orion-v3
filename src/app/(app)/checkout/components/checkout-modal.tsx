"use client";
import { getMeta } from "@/api-calls/meta";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { getContrastColor } from "@/lib/getContrastColor";
import React, { useEffect, useState } from "react";
import CheckoutForm from "./checkout-form";

const CheckoutModal = () => {
  const [primaryColor, setPrimaryColor] = useState("#101010");
  const [open, setOpen] = useState(false);

  const getPrimaryColor = async () => {
    const meta = await getMeta();
    setPrimaryColor(meta?.vendor?.color_primary || "#101010");
  };

  useEffect(() => {
    getPrimaryColor();
  }, []);

  return (
    <>
      <button
        className="w-full py-2 rounded-md mt-4"
        style={{
          backgroundColor: primaryColor,
          color: getContrastColor(primaryColor),
        }}
        onClick={() => setOpen(true)}
      >
        اتمام عملية الشراء
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>اتمام عملية الشراء</DialogTitle>
          <CheckoutForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckoutModal;
