import { getUserAddress } from "@/api-calls/user/getUserAddresses";
import React from "react";
import AddUserAddress from "./add-user-address";
import { Address } from "@/types/types";
import AddressRow from "./address-row";

const UserAddress = async () => {
  const addresses = await getUserAddress();
  console.log("addresses", addresses);
  return (
    <div className="bg-slate-50 rounded-md p-4 shadow-sm relative flex flex-col gap-4 ">
      <div className="flex justify-between items-center">
        <h6>العناوين</h6>
        <AddUserAddress />
      </div>
      <div className="divide-y-[1px] divide-slate-300">
        {addresses.data?.map((address: Address) => (
          <AddressRow address={address} />
        ))}
      </div>
    </div>
  );
};

export default UserAddress;
