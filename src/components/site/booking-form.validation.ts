import type { BookingErrors } from "./booking-form.types";

export function validateBooking(
  formData: FormData,
  date: string,
  slot: string,
): BookingErrors {
  const errors: BookingErrors = {};
  if (!String(formData.get("nom")).trim())
    errors.nom = "Merci d'indiquer votre nom.";
  if (!String(formData.get("prenom")).trim())
    errors.prenom = "Merci d'indiquer votre prénom.";
  const email = String(formData.get("email")).trim();
  if (!email) errors.email = "Merci d'indiquer votre e-mail.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Adresse e-mail invalide.";
  const phone = String(formData.get("telephone")).replace(/[\s.-]/g, "");
  if (!/^(\+33|0)[1-9]\d{8}$/.test(phone) && !/^\+\d{8,15}$/.test(phone))
    errors.telephone = "Numéro invalide (ex. 06 12 34 56 78).";
  if (!date) errors.date = "Choisissez un jour.";
  else if (!slot) errors.creneau = "Choisissez un créneau.";
  if (!formData.get("consent"))
    errors.consent = "Votre accord est nécessaire pour envoyer la demande.";
  return errors;
}

export function prepareBookingData(
  formData: FormData,
  files: File[],
  date: string,
  slot: string,
): FormData {
  formData.delete("images");
  files.forEach((file) => formData.append("images", file));
  formData.set("date", date);
  formData.set("creneau", slot);
  formData.delete("consent");
  return formData;
}
