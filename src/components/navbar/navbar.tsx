// api calls
import { getMeta } from "@/api-calls/meta";
// components
import NavbarSearch from "./navbar-search";
import NavbarIconLink from "./navbar-icon-link";
// icons
import { AiOutlineLogin } from "react-icons/ai";
// next-auth
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import UserMenu from "./user-menu";
import CartToggler from "./cart-toggler";
import { getContrastColor } from "@/lib/getContrastColor";
import Link from "next/link";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const meta = await getMeta();
  const primaryColor = meta?.vendor?.color_primary || "#333";
  return (
    <div className={``} style={{ backgroundColor: primaryColor }}>
      <div className="container py-2 px-4 flex items-center gap-4">
        <Link href="/">
          <img
            src={meta?.vendor?.img}
            height="50px"
            className="h-14"
            alt={meta?.vendor?.slug}
            loading="lazy"
          />
        </Link>
        <NavbarSearch
          bg={"#ffffff40"}
          iconColor={getContrastColor(primaryColor)}
        />
        {session?.user?.accessToken && (
          <div className="flex items-center gap-4">
            {/* <NavbarIconLink href="/?openCart=true" label="السلة" icon={<ShoppingCart />} /> */}
            <CartToggler color={getContrastColor(primaryColor)} />
            <UserMenu color={getContrastColor(primaryColor)} />
          </div>
        )}
        {!session?.user?.accessToken && (
          <NavbarIconLink
            href="/login"
            label="تسجيل دخول"
            icon={<AiOutlineLogin />}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
