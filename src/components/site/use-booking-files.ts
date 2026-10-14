import { useEffect, useState } from "react";
import type { BookingFile } from "./booking-form.types";

export const MAX_FILES = 5;
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

export function useBookingFiles() {
  const [files, setFiles] = useState<BookingFile[]>([]);
  const [error, setError] = useState("");

  useEffect(
    () => () => files.forEach((file) => URL.revokeObjectURL(file.url)),
    [files],
  );

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = [...files];
    let nextError = "";
    for (const file of Array.from(list)) {
      if (!file.type.startsWith("image/")) {
        nextError = "Seules les images sont acceptées.";
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        nextError = `« ${file.name} » dépasse 10 Mo.`;
        continue;
      }
      if (next.length >= MAX_FILES) {
        nextError = "5 images maximum.";
        break;
      }
      next.push({ file, url: URL.createObjectURL(file) });
    }
    setFiles(next);
    setError(nextError);
  }

  function removeFile(index: number) {
    const file = files[index];
    if (!file) return;
    URL.revokeObjectURL(file.url);
    setFiles(files.filter((_, fileIndex) => fileIndex !== index));
  }

  return { files, error, addFiles, removeFile };
}
