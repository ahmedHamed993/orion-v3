"use client";
import React, { useEffect, useState } from "react";
// api calls
import { getCheckout } from "@/api-calls/checkout/checkout";
// components
import CartList from "@/components/cart/cart-list";
import { Separator } from "@/components/ui/separator";
import CheckoutModal from "./checkout-modal";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { getMeta } from "@/api-calls/meta";
import { getContrastColor } from "@/lib/getContrastColor";

const CheckoutContent = () => {
  const [checkoutData, setCheckoutData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refetchFlag, setRefetchFlag] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#101010");

  const refetch = () => setRefetchFlag((prev) => !prev);

  const getPrimaryColor = async ()=> {
    const meta = await getMeta();
    setPrimaryColor(meta?.vendor?.color_primary || "#101010");
  }

  const getCheckoutData = async () => {
    setLoading(true);
    const checkout = await getCheckout();
    setCheckoutData(checkout);
    setLoading(false);
  };
  
  useEffect(() => {
    getCheckoutData();
    getPrimaryColor();
  }, [refetchFlag]);

  return (
    <>
      <div className="max-h-fit w-full h-fit">
        <div className="border-[1px] border-slate-300 p-2 rounded-md bg-white h-fit shadow-sm">
          <CartList refetch={refetch} />
        </div>
      </div>
      <div className="w-full lg:min-w-96 lg:w-96 bg-white border-[1px] border-slate-300 shadow-sm rounded-md p-2 h-fit">
        {loading ? (
          <ul className="space-y-3">
            {[1, 2, 3].map((item) => (
              <Skeleton key={item} className="h-4 w-full bg-slate-300" />
            ))}
            <Separator className="w-full h-[1px] bg-slate-300" />
            <li className="py-2 flex  justify-between items-center">
              <Skeleton className="h-4 w-[10ch] bg-slate-300" />
              <Skeleton className="h-4 w-[10ch] bg-slate-300" />
            </li>
          </ul>
        ) : (
          <ul>
            {checkoutData?.variables?.length &&
              checkoutData?.variables?.map(
                (
                  variable: { key: string; value: number | string },
                  index: number,
                ) => (
                  <li
                    key={index}
                    className="py-2 flex justify-between items-center"
                  >
                    <span className="text-slate-600">{variable.key}</span>
                    <span
                      className={`font-bold ${variable.value === 0 ? "text-green-600" : "text-slate-950"}`}
                    >
                      {variable.value === 0 ? "مجاني" : variable.value}
                    </span>
                  </li>
                ),
              )}
            <Separator className="w-full h-[1px] bg-slate-300" />
            <li className="py-2 flex justify-between items-center">
              <span className="text-slate-950 text-2xl">الاجمالي</span>
              <span className="text-slate-950 font-bold text-2xl">
                {checkoutData.total_order_cost}
              </span>
            </li>
          </ul>
        )}
        {/* <CheckoutModal /> */}
        <Link href="/checkout/user-data" className='block text-center w-full py-2 rounded-md' style={{backgroundColor:primaryColor, color:getContrastColor(primaryColor)}}>التالي</Link>
      </div>
    </>
  );
};

export default CheckoutContent;
