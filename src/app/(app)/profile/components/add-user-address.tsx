"use client";
import InputField from "@/components/input-field/input-field";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import PinLocation from "./pin-location";
import { getMeta } from "@/api-calls/meta";
import { getContrastColor } from "@/lib/getContrastColor";
import { getBaseUrl } from "@/api-calls/actions/getBaseUrl";
import { useSession } from "next-auth/react";
import { fireAlert } from "@/lib/fireAlert";

const AddUserAddress = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const [primaryColor, setPrimaryColor] = useState("#101010");
  const getPrimaryColor = async () => {
    const meta = await getMeta();
    setPrimaryColor(meta?.vendor?.color_primary || "#101010");
  };
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      details: "",
      location: {
        type: "Point",
        coordinates: [20.0667, 32.116],
      },
    },
  });
  const adding = async (values: any) => {
    const baseUrl = await getBaseUrl();
    try {
      const response = await fetch(`${baseUrl}/addresses`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${session?.user.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data.id) {
        fireAlert("تم اضافة العنوان بنجاح", "success");
        setOpen(false);
      }
      throw data;
    } catch (error) {
      fireAlert((error as any)?.message, "error");
    }
  };
  useEffect(() => {
    getPrimaryColor();
  }, []);
  return (
    <>
      <button onClick={() => setOpen(true)}>
        <FiPlus />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>اضافة عنوان</DialogTitle>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(adding)}>
            <InputField label="الاسم" {...register("name")} />
            <InputField label="تفاصيل العنوان" {...register("details")} />
            <PinLocation
              defaultLocation={{
                lat: getValues("location").coordinates[1],
                lng: getValues("location").coordinates[0],
              }}
              handlePositionChanging={(lat: number, lng: number) => {
                setValue("location", {
                  type: "Point",
                  coordinates: [lng, lat],
                });
              }}
            />
            <button
              type="submit"
              className="py-2 rounded-md"
              style={{
                background: primaryColor,
                color: getContrastColor(primaryColor),
              }}
            >
              اضافة
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddUserAddress;
