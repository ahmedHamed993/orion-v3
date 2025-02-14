"use client";
import React, { useState, useEffect } from "react";
// api calls
import { getUserOrders } from "@/api-calls/user/getUserOrders";
// components
import CirclesLoader from "@/components/loader/circles-loader";
import NoItems from "@/components/no-items/no-items";
import OrderRow from "./order-row";

const UserOrders = () => {
  const [orders, setOrders] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    setLoading(true);
    const data: any = await getUserOrders();
    setOrders(data?.data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return loading ? (
    <CirclesLoader />
  ) : (
    <div className="flex flex-col divide-y-[1px] divide-slate-300">
      {orders?.length == 0 ? (
        <NoItems />
      ) : (
        orders?.map((order: any) => {
          return <OrderRow key={order?.id} order={order} />;
        })
      )}
    </div>
  );
};

export default UserOrders;
