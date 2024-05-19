"use client";
import { toast } from "sonner";

export default function useHandleImageDraft() {
  const handleImageDraft = (file: any, imageSetter: any, index?: number) => {
    const reader = new FileReader();
    const maxFileSizeInBytes = 10485760;

    if (file[0]) {
      const fileSize = file[0].size; // in bytes
      if (fileSize > maxFileSizeInBytes) {
        toast.error("File size exceeds the maximum allowed size (10 MB).");
        // Clear the file input to prevent submission
        // input.value = "";
        return;
      }

      reader?.readAsDataURL(file[0]);
    }

    reader.onloadend = () => !isNaN(index as number) ? imageSetter(reader.result, index) : imageSetter(reader.result);
  };

  return handleImageDraft;
}
