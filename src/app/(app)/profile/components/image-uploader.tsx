import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MdImage } from "react-icons/md";
import imageCompression from "browser-image-compression";
import { LuImageUp } from "react-icons/lu";

interface ImageUploaderProps {
  value?: string;
  onChange: (file: File | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ value, onChange }) => {
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const options = { maxSizeMB: 1, maxWidthOrHeight: 1000, useWebWorker: true };
      const compressedFile = await imageCompression(file, options);

      setPreview(URL.createObjectURL(compressedFile));
      onChange(compressedFile);
    } catch (error) {
      console.error("Image compression failed", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="w-40 h-40 border-2 border-gray-200 rounded-full flex items-center justify-center cursor-pointer overflow-hidden"
        onClick={() => fileInputRef.current?.click()}
      >
        {preview ? (
          <Image src={preview} alt="Uploaded" width={160} height={160} className="object-cover w-full h-full" />
        ) : (
          <LuImageUp className="text-gray-400 text-6xl" />
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {/* <Button onClick={() => fileInputRef.current?.click()}>Upload Image</Button> */}
    </div>
  );
};

export default ImageUploader;
