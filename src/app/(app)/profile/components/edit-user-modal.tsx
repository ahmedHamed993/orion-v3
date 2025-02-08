"use client";
import React, { SyntheticEvent, useEffect, useState } from "react";
// icons
import { TbEdit } from "react-icons/tb";
// components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import PhoneInput from "@/app/(auth)/login/components/phone-input";
import ImageUploader from "./image-uploader";
import { useSession } from "next-auth/react";
import { getMe } from "@/api-calls/auth/getMe";
import { getMeta } from "@/api-calls/meta";
import { getContrastColor } from "@/lib/getContrastColor";
import { getBaseUrl } from "@/api-calls/actions/getBaseUrl";
import { toast } from "react-toastify";
const EditUserModal = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [primaryColor, setPrimaryColor] = useState("#333");
  const [openDialog, setOpenDialog] = useState(false);
  const [values, setValues] = useState<{
    img: string | undefined | null | File;
    name: string;
    // email: string;
    // phone: string;
  }>({
    img: undefined,
    name: "",
    // email: "",
    // phone: "",
  });
  const getUserData = async () => {
    if (session?.user.accessToken) {
      const userData = await getMe(session?.user.accessToken);
      setValues({
        img: userData.img,
        name: userData.name || "",
        // email: userData.email || "",
        // phone: userData.phone ? `+${userData.phone}` : "+218",
      });
      setLoading(false);
    }
  };
  const meta = async () => {
    const m = await getMeta();
    setPrimaryColor(m?.vendor.color_primary || "#333");
  };
  useEffect(() => {
    getUserData();
    meta();
  }, [session]);
  const submitEdit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i in values) {
      if (values[i as keyof typeof values]) {
        formData.append(i, values[i as keyof typeof values] ?? "");
      }
    }
    try {
      const baseUrl = await getBaseUrl();
      const response = await fetch(`${baseUrl}/me`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
        body: formData,
      });
      const data: { id: string } = await response.json();
      if (data.id) {
        toast.success("تم التعديل بنجاح");
      } else {
        // toast.success("تم التعديل بنجاح");
        throw data;
      }
    } catch (error: any) {
      toast.error(error?.message?.toString());
    }
  };
  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <button
            onClick={() => setOpenDialog(true)}
            className="flex justify-center items-center gap-2 bg-slate-200 text-sm rounded-full h-12 w-12 absolute top-2 right-2"
          >
            <TbEdit size={32} />
          </button>
        </DialogTrigger>
        <DialogContent dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-start">
              تعديل البيانات الشخصية
            </DialogTitle>
          </DialogHeader>
          {loading ? (
            <p>برجاء الانتظار</p>
          ) : (
            <form onSubmit={submitEdit} className="flex flex-col gap-4">
              <ImageUploader
                value={values?.img?.toString() ?? ""}
                onChange={(newValue) =>
                  setValues((prev) => ({ ...prev, img: newValue }))
                }
              />
              <Input
                type="text"
                name="name"
                placeholder="الاسم"
                className="py-6"
                defaultValue={values.name}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              {/* <Input
                type="email"
                name="email"
                placeholder="البريد الالكتروني"
                className="py-6"
                dir="ltr"
                value={values.email}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, email: e.target.value }))
                }
              />
              <div dir="ltr">
                <PhoneInput
                  value={values.phone}
                  onChange={(newValue) =>
                    setValues((prev) => ({ ...prev, phone: newValue }))
                  }
                />
              </div> */}
              <button
                type="submit"
                className="py-2  text-xl rounded-md"
                style={{
                  backgroundColor: primaryColor,
                  color: getContrastColor(primaryColor),
                }}
              >
                حفظ
              </button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditUserModal;
