import { ReactNode } from "react";
import Link from "next/link";
import { getMeta } from "@/api-calls/meta";
import { getContrastColor } from "@/lib/getContrastColor";
const NavbarIconLink =  async ({href, icon, label}:{href:string;icon:ReactNode; label:string;})=>{
    const meta = await getMeta();
    console.log("meta",meta)
    const primaryColorContrast = getContrastColor(meta?.vendor?.color_primary || "#333");
    return (
      <Link href={href} className='flex items-center gap-2' style={{color:primaryColorContrast}}>
        {icon}
        {label}
      </Link>
    )
  }

export default NavbarIconLink;