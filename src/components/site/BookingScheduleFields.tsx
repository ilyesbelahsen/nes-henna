import type { FieldProps } from "./booking-form.types";

type Props = FieldProps & {
  minDate: string;
  maxDate: string;
  date: string;
  slots: string[] | null;
  slot: string;
  loading: boolean;
  onDateChange: (date: string) => void;
  onSlotChange: (slot: string) => void;
};

export function BookingScheduleFields({
  fieldClassName,
  getAriaProps,
  renderError,
  minDate,
  maxDate,
  date,
  slots,
  slot,
  loading,
  onDateChange,
  onSlotChange,
}: Props) {
  return (
    <>
      <label className="block text-sm font-medium">
        Jour souhaité
        <input
          id="booking-date"
          type="date"
          min={minDate}
          max={maxDate}
          value={date}
          onChange={(event) => onDateChange(event.target.value)}
          className={fieldClassName}
          {...getAriaProps("date")}
        />
        {renderError("date")}
      </label>
      <fieldset aria-describedby="slots-hint">
        <legend className="text-sm font-medium">
          Créneau{" "}
          <span id="slots-hint" className="font-normal text-muted-foreground">
            (horaires de Toulouse)
          </span>
        </legend>
        {!date && (
          <p className="mt-2 text-sm text-muted-foreground">
            Choisissez d'abord un jour.
          </p>
        )}
        {loading && (
          <p className="mt-2 text-sm text-muted-foreground">
            Chargement des créneaux…
          </p>
        )}
        {slots && slots.length === 0 && (
          <p className="mt-2 text-sm">
            Aucun créneau ce jour-là, essayez une autre date.
          </p>
        )}
        {slots && slots.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {slots.map((item) => (
              <label
                key={item}
                className={`flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-sm ${slot === item ? "border-primary bg-primary text-primary-foreground" : "bg-card"}`}
              >
                <input
                  type="radio"
                  name="creneau-pick"
                  value={item}
                  checked={slot === item}
                  onChange={() => onSlotChange(item)}
                  className="sr-only"
                />
                {item}
              </label>
            ))}
          </div>
        )}
        {renderError("creneau")}
      </fieldset>
    </>
  );
}
