"use client";

import React from "react";
import { useRouter } from "next/navigation";
// icons
import { FaRegUser } from "react-icons/fa";
import { GoChecklist } from "react-icons/go";

// components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutMenuItem from "./logout-menu-item";

const UserMenu = () => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="outline-none border-none">
        <button className="flex items-center gap-2 outline-none border-none">
          <FaRegUser />
          <span className="hidden md:inline">الملف الشخصي</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem
          className="flex justify-between"
          onClick={() => router.push("/profile")}
        >
          <FaRegUser />
          <span>الملف الشخصي</span>
          {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex justify-between"
          onClick={() => router.push("/profile/orders")}
        >
          <GoChecklist />
          <span>طلباتي</span>
          {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <LogoutMenuItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
