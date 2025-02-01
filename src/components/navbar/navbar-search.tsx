"use client";
import React, { useState } from "react";
// next
import { useRouter, useSearchParams } from "next/navigation";
// icons
import { Search } from "lucide-react";
const NavbarSearch = ({
  bg,
  hideSearchBtn = false,
}: {
  bg: string;
  hideSearchBtn?: boolean;
}) => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");

  const router = useRouter();
  const goSearch = () =>
    router.push(`/items?q=${search}&${searchParams.toString()}`);
  return (
    <div
      className="flex-1  flex items-center p-2 rounded-md border-[1px] border-slate-50/60"
      style={{ background: bg }}
    >
      <input
        type="search"
        className="border-none outline-none w-full bg-transparent"
        placeholder="بحث..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {hideSearchBtn ? (
        <></>
      ) : (
        <button onClick={goSearch}>
          <Search />
        </button>
      )}
    </div>
  );
};

export default NavbarSearch;
