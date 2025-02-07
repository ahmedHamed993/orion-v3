"use client";
import React, { useState } from "react";
// next
import { useRouter, useSearchParams } from "next/navigation";
// icons
import { LuSearch } from "react-icons/lu";

const NavbarSearch = ({
  bg,
  iconColor,
  hideSearchBtn = false,
}: {
  bg: string;
  iconColor: string;
  hideSearchBtn?: boolean;
}) => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");

  const router = useRouter();
  const goSearch = () =>
    router.push(`/items?q=${search}&${searchParams.toString()}`);
  return (
    <div
      className="flex-1  flex items-center p-2 rounded-md border-[1px] "
      style={{ background: bg, color: iconColor, borderColor:`${iconColor}cc` }}
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
          <LuSearch size={20} />
        </button>
      )}
    </div>
  );
};

export default NavbarSearch;
