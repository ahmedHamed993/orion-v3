"use client";
import { Dispatch, SetStateAction } from "react";
// components
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import CartList from "./cart-list";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const Cart = ({ open, setOpen }: Props) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex flex-col ">
        <SheetHeader className="text-start">
          <SheetTitle>السلة</SheetTitle>
        </SheetHeader>
        <DropdownMenuSeparator />
        <div className="flex-1 overflow-y-auto">
         <CartList />
        </div>
        <DropdownMenuSeparator />
        <SheetFooter className="p-0">
          <Link
            className="w-full  text-center bg-slate-200 py-2 rounded-md "
            href="/checkout"
          >
            اتمام الشراء
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
