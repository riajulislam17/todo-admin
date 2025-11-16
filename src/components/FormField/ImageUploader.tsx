import React from "react";
import { Camera } from "lucide-react";

interface ImageUploaderProps {
  previewImage: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonText?: string;
  imageSize?: "small" | "medium" | "large";
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  previewImage,
  onImageChange,
  buttonText = "Upload New Photo",
  imageSize = "medium",
}) => {
  const sizeClasses = {
    small: "w-24 h-24",
    medium: "w-32 h-32",
    large: "w-40 h-40",
  };

  return (
    <div className="mb-8 p-6 border-2 border-solid border-gray-300 rounded-lg inline-block">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div
            className={`${sizeClasses[imageSize]} rounded-full bg-gray-400 flex items-center justify-center overflow-hidden`}
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <></>
            )}
          </div>
          {/* Camera icon in bottom right corner */}
          <div className="absolute bottom-0 right-0 bg-[#5272FF] p-2 rounded-full">
            <Camera size={20} className="text-white" />
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={onImageChange}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer bg-[#5272FF] text-white px-6 py-2 rounded-lg transition-colors hover:bg-[#4264EE]"
        >
          {buttonText}
        </label>
      </div>
    </div>
  );
};

export default ImageUploader;
