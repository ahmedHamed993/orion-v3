import React, { useEffect, useState } from "react";
// api calls 
import { getBaseUrl } from "@/api-calls/actions/getBaseUrl";
// next-auth 
import { useSession } from "next-auth/react";
// icons 
import { FiPlus, FiMinus } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
// utils 
import { fireAlert } from "@/lib/fireAlert";
import { getContrastColor } from "@/lib/getContrastColor";
// calls 
import { getMeta } from "@/api-calls/meta";
// types 
import { Item } from "@/types/types";
type Props = {
  item: Item;
};

const CartListItem = ({ item }: Props) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [primaryColor, setPrimaryColor] = useState("#101010");
  const [deleted, setDeleted] = useState(false);
  const {data:session} = useSession();
  
  const getPrimaryColor = async ()=>{
    const meta = await getMeta();
    setPrimaryColor(meta?.vendor?.color_primary || "#101010");
  }

  const deleteItem = async ()=>{
    const baseUrl = await getBaseUrl();
    try {
      const response = await fetch(`${baseUrl}/cart/delete`, {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const data = await response.json();
      setDeleted(true);
      return;
    } catch (error) {
      fireAlert(
        (error as any)?.message?.toString() ||
          (error as any)?.messages?.[0]?.toString() ||
          "Try Again",
        "error",
      );
    }
  }

  const editQuantity = async (newQuantity:number)=>{
    const baseUrl = await getBaseUrl();
    try {
      const response = await fetch(`${baseUrl}/cart/edit`, {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          item_id: item.id,
          quantity: newQuantity,
        }),
      });
      const data = await response.json();
      // fireAlert("تم اضافة المنتج الي السلة", "success");
      return;
    } catch (error) {
      fireAlert(
        (error as any)?.message?.toString() ||
          (error as any)?.messages?.[0]?.toString() ||
          "Try Again",
        "error",
      );
    }
  }

  const incQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    editQuantity(newQuantity)
  };

  const decQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      editQuantity(newQuantity);
    }
  };

  useEffect(()=>{
    getPrimaryColor();
  },[])

  return deleted ? <></> : (
    <div className="flex items-center gap-2 py-2 ">
      <img
        src={item.img}
        alt={item.name}
        width={"100px"}
        height={"75px"}
        className="rounded-md overflow-hidden object-cover w-[100px] h-[75px] min-w-[100px] min-h-[75px]"
      />
      <div className="flex-1 max-w-full overflow-hidden">
        <div className="">
          <h6 className="font-semibold truncate ">{item.name}</h6>
          <p className="font-bold">{item.final_price} د.ل</p>
        </div>
        <div className="flex justify-between items-center gap-8">
          <div className="flex items-center gap-2 w-fit">
            <button
              onClick={incQuantity}
              className="flex justify-center items-center h-6 w-6 bg-slate-900 text-slate-50 rounded-full"
              style={{backgroundColor:primaryColor, color:getContrastColor(primaryColor)}}
            >
              <FiPlus />
            </button>
            <input
              className="w-10 text-center"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
            <button
              onClick={decQuantity}
              className="flex justify-center items-center h-6 w-6 bg-slate-900 text-slate-50 rounded-full"
              style={{backgroundColor:primaryColor, color:getContrastColor(primaryColor)}}
            >
              <FiMinus />
            </button>
          </div>
          <button className="text-red-600" onClick={deleteItem}>
            <MdOutlineDeleteOutline className="text-red-700" size={24}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartListItem;
