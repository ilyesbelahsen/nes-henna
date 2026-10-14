import { useEffect, useRef, useState } from "react";
import { getSlots, isDemo, submitBooking } from "@/lib/booking-api";
import { BookingContactFields } from "./BookingContactFields";
import { BookingConsent } from "./BookingConsent";
import { BookingFilesField } from "./BookingFilesField";
import { BookingScheduleFields } from "./BookingScheduleFields";
import { BookingSuccess } from "./BookingSuccess";
import { ErrorMessage } from "./BookingFieldHelpers";
import type { BookingConfirmation, BookingErrors } from "./booking-form.types";
import { prepareBookingData, validateBooking } from "./booking-form.validation";
import { useBookingFiles } from "./use-booking-files";
import { fieldAriaProps, getDateBounds } from "./booking-form.utils";

const FIELD_CLASS_NAME =
  "mt-1 block min-h-12 w-full rounded-xl border border-input bg-card px-4 text-base";

export function BookingForm() {
  const { minDate, maxDate } = getDateBounds();
  const { files, error: fileError, addFiles, removeFile } = useBookingFiles();
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<string[] | null>(null);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slot, setSlot] = useState("");
  const [errors, setErrors] = useState<BookingErrors>({});
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(
    null,
  );
  const requestId = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!date) return;
    const id = ++requestId.current;
    const controller = new AbortController();
    setSlot("");
    setSlots(null);
    setSlotsLoading(true);
    getSlots(date, controller.signal)
      .then((nextSlots) => id === requestId.current && setSlots(nextSlots))
      .catch(() => {
        if (id === requestId.current) {
          setSlots([]);
          setStatus("Impossible de charger les créneaux.");
        }
      })
      .finally(() => id === requestId.current && setSlotsLoading(false));
    return () => controller.abort();
  }, [date]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const formData = new FormData(event.currentTarget);
    const nextErrors = validateBooking(formData, date, slot);
    if (fileError) nextErrors.images = fileError;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("Le formulaire contient des erreurs.");
      formRef.current
        ?.querySelector<HTMLElement>("[aria-invalid='true']")
        ?.focus();
      return;
    }
    setSending(true);
    setStatus("Envoi en cours…");
    const result = await submitBooking(
      prepareBookingData(
        formData,
        files.map(({ file }) => file),
        date,
        slot,
      ),
    );
    setSending(false);
    if (result.status === "ok") {
      setConfirmation({ date, slot });
      setStatus("Demande envoyée.");
      return;
    }
    setStatus(result.message);
    if (result.status === "taken") {
      setSlot("");
      setSlots((current) => current?.filter((item) => item !== slot) ?? null);
    }
  }

  const renderError = (key: keyof BookingErrors) => (
    <ErrorMessage message={errors[key]} />
  );
  const fields = {
    errors,
    fieldClassName: FIELD_CLASS_NAME,
    getAriaProps: (key: keyof BookingErrors) => fieldAriaProps(errors, key),
    renderError,
  };
  if (confirmation) return <BookingSuccess confirmation={confirmation} />;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="grid gap-5 rounded-2xl border bg-card p-5 shadow-soft sm:p-8"
    >
      {isDemo && (
        <p className="rounded-lg bg-secondary px-3 py-2 text-sm text-secondary-foreground">
          Mode démonstration : aucune demande n'est réellement envoyée.
        </p>
      )}
      <BookingContactFields {...fields} />
      <BookingFilesField
        {...fields}
        files={files}
        onAdd={addFiles}
        onRemove={removeFile}
      />
      <BookingScheduleFields
        {...fields}
        minDate={minDate}
        maxDate={maxDate}
        date={date}
        slots={slots}
        slot={slot}
        loading={slotsLoading}
        onDateChange={setDate}
        onSlotChange={setSlot}
      />
      <BookingConsent {...fields} />
      <button
        type="submit"
        disabled={sending}
        aria-busy={sending}
        className="min-h-12 rounded-full bg-primary px-6 font-medium text-primary-foreground shadow-soft disabled:opacity-60"
      >
        {sending ? "Envoi…" : "Envoyer ma demande"}
      </button>
      <p aria-live="polite" role="status" className="text-sm">
        {status}
      </p>
    </form>
  );
}
