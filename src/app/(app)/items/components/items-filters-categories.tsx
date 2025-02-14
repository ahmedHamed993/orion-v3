"use client";
import React, { useEffect, useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { getAllCategories, structureCategories } from "@/api-calls/categories";
import { StructuredCategory } from "@/types/types";
type Props = {
  filters: any;
  handleCategoryChange: (id: string) => void;
};

const ItemsFilterCategories = ({ filters, handleCategoryChange }: Props) => {
  const [open, setOpen] = useState<string[]>([]);
  const [categories, setCategories] = useState<StructuredCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const handleOpen = (catId: string) => {
    if (open.includes(catId)) {
      setOpen((prev) => [...prev.filter((i) => i !== catId)]);
      // const parentCat = categories.find(item => item.id == catId);
      // parentCat?.children.forEach(item => {
      //   handleCategoryChange(item.id)
      // })
    } else {
      setOpen((prev) => [...prev, catId]);
    }
  };
  const getCategories = async () => {
    const allCategories = await getAllCategories();
    setCategories((allCategories as any) || []);
    setLoading(false);
  };
  useEffect(() => {
    getCategories();
  }, []);
  return loading ? (
    <p>loading..</p>
  ) : (
    <div>
      {categories?.map((c) => (
        <div key={c.id}>
          <button
            className="flex items-center gap-2 mb-1 font-semibold"
            onClick={() => handleOpen(c.id)}
          >
            <div className="w-4 h-4 border-[1px] border-slate-300 flex items-center justify-center rounded-sm text-slate-400">
              {open.includes(c.id) ? <FiMinus /> : <FiPlus />}
            </div>
            <span>{c.name}</span>
          </button>
          <div
            className={`ps-2 overflow-hidden transition-all ${open.includes(c.id) ? "h-[calc(calc-size())]" : "h-0"}`}
          >
            <button
                key={c.id}
                className="flex items-center gap-2"
                onClick={() => handleCategoryChange(c.id.toString())}
              >
                <div className="w-4 h-4 border-[1px] border-slate-300 flex items-center justify-center rounded-md">
                  {filters.categories.includes(c?.id.toString()) ? (
                    <span className="inline-block w-2 h-2 bg-slate-400 rounded-sm"></span>
                  ) : (
                    <></>
                  )}
                </div>
                <span className="text-slate-800">الكل</span>
              </button>
            {c.children.map((cat) => (
              <button
                key={cat.id}
                className="flex items-center gap-2"
                onClick={() => handleCategoryChange(cat.id.toString())}
              >
                <div className="w-4 h-4 border-[1px] border-slate-300 flex items-center justify-center rounded-md">
                  {filters.categories.includes(cat?.id.toString()) ? (
                    <span className="inline-block w-2 h-2 bg-slate-400 rounded-sm"></span>
                  ) : (
                    <></>
                  )}
                </div>
                <span className="text-slate-800">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemsFilterCategories;
