"use client";
import React, { useState } from "react";
// next
import Image from "next/image";
type Props = {
  image: string;
  images: { id: string; img: string }[] | [];
};

const ItemImages = ({ image, images }: Props) => {
  const [currentImage, setCurrentImage] = useState(image);
  return (
    <div className="max-w-full w-full md:w-[400px]">
      <div className="border-2 box-content rounded-md text-center w-full ">
        <img
          src={currentImage}
          height={"100%"}
          width={"100%"}
          alt={"item image"}
          className="mx-auto object-contain w-full h-full"
          style={{aspectRatio: 4/3 }}
        />
      </div>
      <div className="max-w-full overflow-auto ">
        {images?.length ? ( 
          <div className="flex  gap-2 mt-2">
              <img src={image} width="200px" height="150px" className="w-20 h-20 min-w-20 min-h-20 md:w-28 md:h-28 md:min-w-28 md:min-h-28 object-contain border-2 rounded-md" loading="lazy" onClick={()=>setCurrentImage(image)} />
            {images.map((img) => (
              <img key={img.id} src={img.img} width="200px" height="150px" className="w-20 h-20 min-w-20 min-h-20 md:w-28 md:h-28 md:min-w-28 md:min-h-28 object-contain border-2 rounded-md" loading="lazy" onClick={()=>setCurrentImage(img.img)} />
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ItemImages;
