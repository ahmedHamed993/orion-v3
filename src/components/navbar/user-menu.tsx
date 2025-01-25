'use client'

import React from 'react'
// icons 
import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
} from "lucide-react"
// components 
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'

const UserMenu = () => {
    const router = useRouter(); 
    const logoutUser = ()=>{
        alert("logout")
    }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='outline-none border-none'>
        <button  className='flex items-center gap-2 outline-none border-none'> <User /> الملف الشخصي</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
          <DropdownMenuItem className='flex justify-between' onClick={()=>router.push("/profile")}>
            <User />
            <span>الملف الشخصي</span>
            {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='flex justify-between text-red-600' onClick={logoutUser}>
          <LogOut />
          <span>تسجيل الخروج</span>
          {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  
  )
}

export default UserMenu