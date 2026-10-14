import type { BookingErrorKey, FieldProps } from "./booking-form.types";

export function ErrorMessage({ message }: { message: string | undefined }) {
  return message ? (
    <p className="mt-1 text-sm text-destructive">{message}</p>
  ) : null;
}
