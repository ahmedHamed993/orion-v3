import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getMe } from "@/api-calls/auth/getMe";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa";
import { PiUserCircleThin } from "react-icons/pi";
import { MdAlternateEmail } from "react-icons/md";
import { FiSmartphone } from "react-icons/fi";
import EditUserModal from "./components/edit-user-modal";
import UserAddress from "./components/user-addresses";
import { redirect } from "next/navigation";

const Profile = async () => {
  const session = await getServerSession(authOptions);
  const me = await getMe(session?.user.accessToken || "");
  console.log("session", session);
  if (!session?.user?.accessToken) {
    redirect("/");
  }
  return (
    <div className="bg-slate-200/55 min-h-screen">
      <div className="container px-4 md:px-8 flex flex-col items-start lg:flex-row gap-4 py-8 relative">
        <div className="flex flex-col gap-4 w-full lg:w-96">
          {/* user card  */}
          <div className=" bg-slate-50 rounded-md p-4 shadow-sm relative flex flex-col gap-4 items-center ">
            {me?.img ? (
              <Image
                src={me.img}
                width={256}
                height={256}
                alt={me.name || "user name"}
              />
            ) : (
              <PiUserCircleThin size={256} />
            )}
            <div className="flex gap-2 flex-row justify-center flex-wrap">
              <div className="bg-slate-200 rounded-md py-1 px-2 text-sm flex items-center gap-2">
                <FaRegUser /> {me.name || "لا يوجد"}
              </div>
              <div className="bg-slate-200 rounded-md py-1 px-2 text-sm flex items-center gap-2">
                <MdAlternateEmail /> {me.email || "لا يوجد"}
              </div>
              <div className="bg-slate-200 rounded-md py-1 px-2 text-sm flex items-center gap-2">
                <FiSmartphone /> {me.phone || "لا يوجد"}
              </div>
            </div>
            <EditUserModal />
          </div>
          {/* user addresses  */}
          <UserAddress />
        </div>
        {/* orders  */}
        <div className="min-h-screen bg-slate-50 flex-1 rounded-md  w-full p-4 shadow-sm">
          <h6>طلباتك</h6>
        </div>
      </div>
    </div>
  );
};

export default Profile;
