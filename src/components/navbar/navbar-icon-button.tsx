"use client"
import { ReactNode } from "react";
import Link from "next/link";

const NavbarIconButton = ({label, icon, clickHandler}:{label:string; icon:ReactNode; clickHandler:()=>any})=>{
    return (
      <button  className='flex items-center gap-2' onClick={clickHandler}>
        {label}
        {icon}
      </button>
    )
  }

export default NavbarIconButton;