import { Link } from "@tanstack/react-router";
import type { FieldProps } from "./booking-form.types";

export function BookingConsent({ getAriaProps, renderError }: FieldProps) {
  return (
    <>
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          Site web
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          name="consent"
          className="mt-1 h-5 w-5 shrink-0"
          {...getAriaProps("consent")}
        />
        <span>
          J'accepte le traitement de mes données et de mes photos pour traiter
          ma demande, conformément à la{" "}
          <Link to="/confidentialite" className="underline">
            politique de confidentialité
          </Link>
          .
        </span>
      </label>
      {renderError("consent")}
      <p className="text-sm text-muted-foreground">
        Après votre demande, vous recevrez un message automatique sur WhatsApp
        et l'artiste reçoit toutes les informations par e-mail.
      </p>
    </>
  );
}
