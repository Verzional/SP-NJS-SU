"use client";

import { CldUploadWidget } from "next-cloudinary";
import { UploadWidgetProps } from "@/types/action";

export function UploadWidget({ onUploadSuccess }: UploadWidgetProps) {
  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET || "ml_default"}
      onSuccess={(result) => {
        if (
          result.event === "success" &&
          result.info &&
          typeof result.info === "object" &&
          "secure_url" in result.info && "public_id" in result.info
        ) {
          onUploadSuccess(result.info.secure_url, result.info.public_id);
        }
      }}
    >
      {({ open }) => (
        <button
          onClick={() => open()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Upload Image
        </button>
      )}
    </CldUploadWidget>
  );
}
