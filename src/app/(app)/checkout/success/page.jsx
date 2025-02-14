import React from "react";
import CheckoutSuccess from "@/components/illustrations/checkout-success";
import { getMeta } from "@/api-calls/meta";
import Link from "next/link";
const SuccessCheckout = async () => {
  const meta = await getMeta();
  return (
    <div className="flex items-center justify-center gap-4 flex-col">
      <CheckoutSuccess
        className="w-72 h-72 md:w-96 md:h-96"
        primaryColor={meta?.vendor?.color_primary || "#333"}
      />
      <Link
        href="/items"
        style={{ backgroundColor: meta?.vendor?.color_primary || "#333" }}
        className="py-3 px-6 rounded-md font-semibold"
      >
        تصفح المزيد من المنتجات
      </Link>
    </div>
  );
};

export default SuccessCheckout;
