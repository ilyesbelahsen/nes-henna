import type { FieldProps } from "./booking-form.types";

export function BookingContactFields({
  fieldClassName,
  getAriaProps,
  renderError,
}: FieldProps) {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Nom
          <input
            name="nom"
            autoComplete="family-name"
            className={fieldClassName}
            {...getAriaProps("nom")}
          />
          {renderError("nom")}
        </label>
        <label className="block text-sm font-medium">
          Prénom
          <input
            name="prenom"
            autoComplete="given-name"
            className={fieldClassName}
            {...getAriaProps("prenom")}
          />
          {renderError("prenom")}
        </label>
      </div>
      <label className="block text-sm font-medium">
        E-mail
        <input
          name="email"
          type="email"
          autoComplete="email"
          className={fieldClassName}
          {...getAriaProps("email")}
        />
        {renderError("email")}
      </label>
      <label className="block text-sm font-medium">
        Téléphone (WhatsApp)
        <input
          name="telephone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          className={fieldClassName}
          {...getAriaProps("telephone")}
        />
        {renderError("telephone")}
      </label>
    </>
  );
}
