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

const Profile = async () => {
  const session = await getServerSession(authOptions);
  const me = await getMe(session?.user.accessToken || "");
  return (
    <div className="bg-slate-200/55 min-h-screen">
      <div className="container px-4 md:px-8 flex flex-col items-start lg:flex-row gap-8 py-8 relative">
        {/* user card  */}
        <div className=" bg-slate-50 w-full rounded-md lg:w-96 p-4 shadow-sm flex flex-col gap-4 items-center relative lg:sticky top-4">
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
        {/* orders  */}
        <div className="min-h-screen bg-slate-50 flex-1 rounded-md  p-4 shadow-sm">
          <h6>طلباتك</h6>
        </div>
      </div>
    </div>
  );
};

export default Profile;
