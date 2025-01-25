'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
// icons 
import { LogOut } from "lucide-react"
// components 
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"


const LogoutMenuItem = () => {
    const logoutUser = ()=>{
        alert("logout")
    }
  return (
    <DropdownMenuItem className='flex justify-between text-red-600 ' onClick={logoutUser}>
        <LogOut />
        <span>تسجيل الخروج</span>
    </DropdownMenuItem>
  )
}

export default LogoutMenuItem