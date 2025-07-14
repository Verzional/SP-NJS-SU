"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAchievement, editAchievement } from "@/lib/achievement";
import { AchievementFormProps } from "@/types/achievement";
import { UploadWidget } from "./UploadWidget";

export default function AchievementForm({ mode, data }: AchievementFormProps) {
  /* States */
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>(data?.imageUrl || "");
  const [imagePublicId, setImagePublicId] = useState<string>(
    data?.imagePublicId || ""
  );

  const router = useRouter();

  function handleImageUpload(url: string, publicId?: string) {
    setImageUrl(url);
    setImagePublicId(publicId || "");
  }

  /* Form Submission Handler */
  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setErrors([]);
    setSuccess("");

    try {
      if (imageUrl) {
        formData.append("imageUrl", imageUrl);
      }

      if (imagePublicId) {
        formData.append("imagePublicId", imagePublicId);
      }

      if (mode === "create") {
        /* Create Achievement */
        const result = await createAchievement(formData);
        if (result.success) {
          setSuccess(result.message || "Achievement created successfully!");
          const form = document.getElementById(
            "achievement-form"
          ) as HTMLFormElement;
          form?.reset();
          setImageUrl("");
          setImagePublicId("");
          setTimeout(() => {
            router.push("/dashboard/pr");
          }, 500);
        } else {
          setErrors([result.error || "Failed to create achievement"]);
        }
      } else if (mode === "edit" && data) {
        /* Edit Achievement */
        const result = await editAchievement(data.id, formData);
        if (result.success) {
          setSuccess(result.message || "Achievement updated successfully!");
          setTimeout(() => {
            router.push("/dashboard/pr");
          }, 500);
        } else {
          setErrors([result.error || "Failed to update achievement"]);
        }
      }
    } catch (error) {
      setErrors([
        error instanceof Error ? error.message : "An unexpected error occurred",
      ]);
    } finally {
      setIsSubmitting(false);
    }
  }

  /* Render the Form */
  return (
    /* Form Container */
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Success Message */}
      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      {/* Error Message */}
      {errors.length > 0 && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <ul className="list-disc list-inside">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Achievement Form */}
      <form
        id="achievement-form"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleSubmit(formData);
        }}
        className={`space-y-4 ${
          isSubmitting ? "opacity-60 pointer-events-none" : ""
        }`}
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={data?.title || ""}
            required
            maxLength={100}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter activity title"
          />
        </div>

        {/* Description Input */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={data?.description || ""}
            required
            maxLength={500}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            placeholder="Enter activity description"
          />
        </div>

        {/* Cover Image Input */}
        <div>
          <label
            htmlFor="cover_image"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Cover Image
          </label>
          <div className="space-y-3">
            <UploadWidget onUploadSuccess={handleImageUpload} />
            {imageUrl && (
              <div className="flex items-center space-x-3">
                <Image
                  width={80}
                  height={80}
                  src={imageUrl}
                  alt="Uploaded cover"
                  className="w-20 h-20 object-cover rounded-md border"
                />
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {mode === "create" ? "Creating..." : "Updating..."}
            </span>
          ) : mode === "create" ? (
            "Create Achievement"
          ) : (
            "Update Achievement"
          )}
        </button>
      </form>
    </div>
  );
}
