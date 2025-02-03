"use client";
import React, { useState } from "react";
// components
import { Slider } from "@/components/ui/slider";
import ItemsFilterCategories from "./items-filters-categories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// next
import { useRouter, useSearchParams } from "next/navigation";
// libs
import { getContrastColor } from "@/lib/getContrastColor";
// types
type Filters = {
  page: number;
  paginate: number;
  price_min: number | null;
  price_max: number | null;
  categories: string[];
  q: string;
  sorts: string | null;
};

const sortsOptions = [
  {
    label: "الاعلي سعر",
    value: "-final_price",
  },
  {
    label: "الاقل سعر",
    value: "final_price",
  },
];

const ItemsFilters = ({ primaryColor }: { primaryColor: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [range, setRange] = useState([0, 1000]);
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    paginate: 12,
    price_min: null,
    price_max: null,
    categories: searchParams.getAll("categories") || [],
    q: searchParams.get("q") || "",
    sorts: null,
  });

  const handleCategoryChange = (catId: string) => {
    if (filters.categories.includes(catId)) {
      setFilters((prev) => ({
        ...prev,
        categories: prev.categories.filter((item) => item !== catId),
      }));
      return;
    }
    setFilters((prev) => ({
      ...prev,
      categories: [...prev.categories, catId],
    }));
  };

  const handleFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("categories");
    for (const key in filters) {
      const value = filters[key as keyof typeof filters];

      if (value !== null && value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((item) => params.append(key, item));
        } else {
          params.set(key, value.toString());
        }
      }
    }
    router.push(`/items?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-2">
      {/* search  */}
      <div className="">
        <input
          type="search"
          className="border-none outline-none w-full shadow-none lg:shadow-sm bg-white py-2 px-2 rounded-md border-[1px] border-slate-200"
          placeholder="بحث..."
          value={filters.q}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, q: e.target.value }))
          }
        />
      </div>
      {/* sorts  */}
      <div className="py-2 bg-white px-2 shadow-none lg:shadow-sm rounded-md">
        <h6 className="font-semibold mb-2">الترتيب</h6>
        <div className="flex flex-col gap-2">
          <Select
            dir="rtl"
            value={filters.sorts || undefined}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, sorts: value }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="ترتيب حسب" />
            </SelectTrigger>
            <SelectContent>
              {sortsOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* {sortsOptions.map((opt) => (
            <button
              onClick={() =>
                setFilters((prev) => ({ ...prev, sorts: opt.value }))
              }
              className="border-[1px] border-slate-300 w-fit py-2 px-2 rounded-full text-xs"
              style={{borderColor:filters?.sorts === opt.value?"blue":"#ddd"}}
            >
              {opt.label}
            </button>
          ))} */}
        </div>
      </div>
      {/* categories  */}
      <div className="py-2 bg-white px-2 shadow-none lg:shadow-sm rounded-md">
        <h6 className="font-semibold mb-2">التصنيفات</h6>
        <ItemsFilterCategories
          filters={filters}
          handleCategoryChange={handleCategoryChange}
        />
      </div>
      {/* price  */}
      <div className="py-2 bg-white px-2 shadow-none lg:shadow-sm rounded-md">
        <h6 className="font-semibold mb-2">السعر</h6>
        <div className="flex flex-col gap-1">
          {range[0]} - {range[1]}
          <Slider
            defaultValue={[0, 24]}
            max={1000}
            min={0}
            step={1}
            value={range}
            onValueChange={(value) => {
              setRange(value);
              setFilters((prev) => ({
                ...prev,
                price_min: value[0],
                price_max: value[1],
              }));
            }}
            dir="rtl"
            // formatLabel={(value) => `${value} hrs`}
          />
        </div>
      </div>
      {/* submit filters  */}
      <button
        className="mt-4 flex w-full py-2 justify-center font-semibold rounded-md"
        style={{
          background: primaryColor,
          color: getContrastColor(primaryColor),
        }}
        onClick={handleFilters}
      >
        تصفية النتائج
      </button>
    </div>
  );
};

export default ItemsFilters;
