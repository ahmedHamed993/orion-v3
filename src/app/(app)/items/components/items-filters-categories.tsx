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
    console.log('all categories',allCategories);
    setCategories(allCategories as any|| []);
    setLoading(false);
  };
  useEffect(() => {
    getCategories();
  }, []);
  return loading ? (
    <p>loading..</p>
  ) : (
    <div>
      {/* {nestedCategories.map((c) => (
        <div key={c.id}>
          <button
            className="flex items-center gap-2 mb-1 font-semibold"
            onClick={() => handleOpen(c.id)}
          >
            <div className="w-4 h-4 border-[1px] border-slate-300 flex items-center justify-center rounded-sm text-slate-400">
              {open.includes(c.id) ? <Minus /> : <Plus />}
            </div>
            <span>{c.name}</span>
          </button>
          <div
            className={`ps-2 overflow-hidden transition-all ${open.includes(c.id) ? "h-[calc(calc-size())]" : "h-0"}`}
          >
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
      ))} */}
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
{
  /* <button key={cat.id} className='flex items-center gap-2' onClick={()=>handleCategoryChange(cat.id.toString())}>
            <div className='w-4 h-4 border-[1px] border-slate-300 flex items-center justify-center rounded-md'>
                { filters.categories.includes(cat?.id.toString()) ?<span className='inline-block w-2 h-2 bg-slate-400 rounded-sm'></span> : <></> }
            </div>
            <span>{cat.name}</span>
            </button> */
}
export default ItemsFilterCategories;

const categories = [
  {
    id: 1,
    name: "ملابس ",
  },
  {
    id: 2,
    name: "هواتف ذكية",
  },
  {
    id: 3,
    name: "ساعات ذكية",
  },
  {
    id: 4,
    name: "احذية رياضية",
  },
];

const nestedCategories = [
  {
    id: "1",
    name: "ملابس",
    children: [
      {
        id: "2",
        name: "ملابس علوية",
      },
      {
        id: "3",
        name: "بناطيل",
      },
      {
        id: "4",
        name: "احذية",
      },
    ],
  },
  {
    id: "5",
    name: "اكسسورات",
    children: [
      {
        id: "6",
        name: "اساور",
      },
      {
        id: "7",
        name: "خواتم",
      },
      {
        id: "8",
        name: "حلقان",
      },
    ],
  },
];
// filters.categories.forEach((item: string) => {
//   categories?.forEach((pItem) => {
//     if (pItem.children.some((i) => i.id === item)) {
//       setOpen((prev) => [...prev, pItem.id]);
//     }
//   });
// });
