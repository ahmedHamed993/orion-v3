"use client";
import React, { useEffect, useState } from "react";
import ItemsFilters from "./items-filters";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getMeta } from "@/api-calls/meta";
import { getContrastColor } from "@/lib/getContrastColor";
import { LuFilter } from "react-icons/lu";

const Filters = ({ primaryColor }: { primaryColor: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* filters in lg screens  */}
      <div className="w-64  hidden lg:block py-4">
        <ItemsFilters primaryColor={primaryColor} />
      </div>
      {/* filters in small screen togglers  */}
      <button
        className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:hidden flex items-center gap-2 py-2 px-6 rounded-full shadow-md"
        style={{
          background: primaryColor,
          color: getContrastColor(primaryColor),
        }}
        onClick={() => setOpen(true)}
      >
        تصفية <LuFilter size={16} />
      </button>
      {/* filters in small screens  */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="flex flex-col overflow-auto">
          <SheetHeader className="text-start">
            <SheetTitle>تصفية النتائج</SheetTitle>
          </SheetHeader>
          <ItemsFilters primaryColor={primaryColor} />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Filters;
