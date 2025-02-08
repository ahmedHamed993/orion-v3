"use client";
import { getBaseUrl } from "@/api-calls/actions/getBaseUrl";
import { fireAlert } from "@/lib/fireAlert";
import { Address } from "@/types/types";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TbCurrentLocation } from "react-icons/tb";

type Props = {
  address: Address;
};

const AddressRow = ({ address }: Props) => {
  const [deleted, setDeleted] = useState(false);
  const { data: session } = useSession();
  const handleDelete = async () => {
    setDeleted(true);
    const baseUrl = await getBaseUrl();
    try {
      const response = await fetch(`${baseUrl}/addresses/${address.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      });
      const data = await response.json();
      if (data?.id) {
        fireAlert("تم حذف العنوان بنجاح", "success");
        return;
      }
      throw data;
    } catch (error) {
      fireAlert((error as any)?.message ?? "Error", "error");
    }
  };
  return deleted ? (
    <></>
  ) : (
    <div className="flex justify-between items-center py-2">
      <div className="flex items-center gap-2">
        <span>
          <TbCurrentLocation />
        </span>
        <span>{address.name}</span>
      </div>
      <button onClick={handleDelete}>
        <MdOutlineDeleteOutline className="text-red-700" size={20} />
      </button>
    </div>
  );
};

export default AddressRow;
