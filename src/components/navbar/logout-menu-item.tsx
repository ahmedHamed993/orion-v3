"use client";

import React from "react";
import { useRouter } from "next/navigation";
// icons
import { RiLogoutCircleLine } from "react-icons/ri";
// components
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { logout } from "@/api-calls/auth/logout";
import { signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";

const LogoutMenuItem = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const logoutUser = async () => {
    try {
      const logoutResponse = await logout(session?.user?.accessToken ?? "");
      const signoutResponse = await signOut();
      router.push("/");
    } catch (error) {
      toast.error((error as any)?.message);
    }
  };
  return (
    <DropdownMenuItem
      className="flex justify-between text-red-600 "
      onClick={logoutUser}
    >
      <RiLogoutCircleLine />
      <span>تسجيل الخروج</span>
    </DropdownMenuItem>
  );
};

export default LogoutMenuItem;
