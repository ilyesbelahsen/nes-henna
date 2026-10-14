import type { ReactNode } from "react";

export type BookingErrorKey =
  | "nom"
  | "prenom"
  | "email"
  | "telephone"
  | "images"
  | "date"
  | "creneau"
  | "consent";
export type BookingErrors = Partial<Record<BookingErrorKey, string>>;
export type BookingFile = { file: File; url: string };
export type BookingConfirmation = { date: string; slot: string };
export type FieldProps = {
  errors: BookingErrors;
  fieldClassName: string;
  getAriaProps: (key: BookingErrorKey) => {
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
  };
  renderError: (key: BookingErrorKey) => ReactNode;
};
