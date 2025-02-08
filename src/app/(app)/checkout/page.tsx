import { getCheckout } from "@/api-calls/checkout/checkout";
import CartList from "@/components/cart/cart-list";
import CartListItem from "@/components/cart/cart-list-item";
import { Separator } from "@radix-ui/react-dropdown-menu";
import React from "react";
import CheckoutModal from "./components/checkout-modal";

const Checkout = async () => {
  const checkout = await getCheckout();
  return (
    <div className="flex gap-4 bg-slate-100 min-h-screen">
      <div className="container flex gap-4 px-4 md:px-8 py-8 flex-col lg:flex-row">
        <div className="flex-1 max-h-fit h-fit">
          <div className="border-[1px] border-slate-300 p-2 rounded-md bg-white h-fit shadow-sm">
            <CartList />
          </div>
        </div>
        <div className="w-full lg:w-96 bg-white border-[1px] border-slate-300 shadow-sm rounded-md p-2 h-fit">
          <ul>
            {checkout.variables.map(
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
                {checkout.total_order_cost}
              </span>
            </li>
          </ul>
          <CheckoutModal />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
