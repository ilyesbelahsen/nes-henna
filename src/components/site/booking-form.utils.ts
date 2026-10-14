import type { BookingErrorKey, BookingErrors } from "./booking-form.types";
import { localISO } from "@/lib/booking-api";

export function fieldAriaProps(errors: BookingErrors, key: BookingErrorKey) {
  return {
    "aria-invalid": !!errors[key],
    "aria-describedby": errors[key] ? `${key}-err` : undefined,
  } as const;
}

export function getDateBounds() {
  const today = new Date();
  return {
    minDate: localISO(today),
    maxDate: localISO(
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 60),
    ),
  };
}
