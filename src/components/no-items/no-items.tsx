import Image from "next/image";
import React from "react";

const NoItems = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <Image
        src="/images/empty-box.png"
        width={256}
        height={256}
        alt="لا يوجد عناضر"
      />
      <p className="text-slate-900 font-semibold">لا يوجد منتجات لعرضها</p>
    </div>
  );
};

export default NoItems;
