import type { BookingFile, FieldProps } from "./booking-form.types";
import { MAX_FILES } from "./use-booking-files";

type Props = FieldProps & {
  files: BookingFile[];
  onAdd: (files: FileList | null) => void;
  onRemove: (index: number) => void;
};

export function BookingFilesField({
  fieldClassName,
  getAriaProps,
  renderError,
  files,
  onAdd,
  onRemove,
}: Props) {
  return (
    <div>
      <label className="block text-sm font-medium">
        Modèles souhaités{" "}
        <span className="font-normal text-muted-foreground">
          (5 images max, 10 Mo chacune)
        </span>
        <input
          type="file"
          accept="image/*"
          multiple
          disabled={files.length >= MAX_FILES}
          onChange={(event) => {
            onAdd(event.target.files);
            event.target.value = "";
          }}
          className={`${fieldClassName} file:mr-3 file:min-h-11 file:rounded-full file:border-0 file:bg-secondary file:px-4 file:text-secondary-foreground`}
          {...getAriaProps("images")}
        />
      </label>
      {renderError("images")}
      {files.length > 0 && (
        <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {files.map((file, index) => (
            <li key={file.url} className="relative">
              <img
                src={file.url}
                alt={`Modèle ${index + 1} : ${file.file.name}`}
                width={120}
                height={120}
                className="aspect-square w-full rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={() => onRemove(index)}
                aria-label={`Retirer ${file.file.name}`}
                className="absolute right-1 top-1 h-11 w-11 rounded-full bg-card/90 text-lg"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
