// api calls 
import { getMeta } from '@/api-calls/meta';
// components 
import NavbarSearch from './navbar-search';
import NavbarIconLink from './navbar-icon-link';
// icons 
import { ShoppingCart, ScrollText, User, LogIn} from 'lucide-react';
// next-auth 
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import UserMenu from './user-menu';


const Navbar = async () => {
  const session = await getServerSession(authOptions)
  const meta = await getMeta();
  const primaryColor = meta?.vendor?.color_primary || "#333";
  console.log("session",session)
  return (
    <div className={``} style={{backgroundColor:primaryColor}}>
      <div className="container py-2 px-4 flex items-center gap-4">
        <img src={meta?.vendor?.img} height='50px' className='h-14' alt={meta?.vendor.slug} loading='lazy'/>
        <NavbarSearch bg={'#ffffff40'} />
        {session?.user?.accessToken && 
          <div className='hidden md:flex md:items-center md:gap-4'>
            <NavbarIconLink href="/?openCart=true" label="السلة" icon={<ShoppingCart />} />
            <NavbarIconLink href="/orders" label="الطلبات" icon={<ScrollText /> } />
            {/* <NavbarIconLink href="/profile" label="الملف الشخصي" icon={<User /> } /> */}
            <UserMenu />
          </div>
        }
        {
          !session?.user?.accessToken && 
          <NavbarIconLink href="/login" label="تسجيل الدخول" icon={<LogIn /> } />
        }
      </div>
    </div>
  )
}

export default Navbar;

