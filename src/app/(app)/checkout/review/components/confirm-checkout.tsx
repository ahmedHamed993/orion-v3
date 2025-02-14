"use client";
import React, { useState } from "react";
// lib
import { fireAlert } from "@/lib/fireAlert";
import { getContrastColor } from "@/lib/getContrastColor";
// next-auth
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// calls
import { getBaseUrl } from "@/api-calls/actions/getBaseUrl";

const ConfirmCheckout = ({
  primaryColor = "#101010",
}: {
  primaryColor?: string;
}) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);
    try {
      const baseUrl = await getBaseUrl();
      const response = await fetch(`${baseUrl}/cart/checkout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name: session?.user?.name,
        }),
      });
      const data = await response.json();
      if (data?.id) {
        fireAlert("تم استلام طلبك بنجاح", "success");
        router.push("/checkout/success");
        return;
      }
      throw data;
    } catch (error) {
      fireAlert((error as any)?.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="sticky bottom-0 mx-auto block py-2 px-4 rounded-full shadow-md"
      style={{
        backgroundColor: primaryColor,
        color: getContrastColor(primaryColor),
      }}
      disabled={loading}
    >
      تاكيد الطلب
    </button>
  );
};

export default ConfirmCheckout;
