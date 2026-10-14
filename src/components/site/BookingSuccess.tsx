import type { BookingConfirmation } from "./booking-form.types";

function formatDate(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function BookingSuccess({
  confirmation,
}: {
  confirmation: BookingConfirmation;
}) {
  return (
    <div
      className="rounded-2xl border bg-card p-6 text-center shadow-soft"
      role="status"
    >
      <h3 className="text-3xl">Merci, c'est noté !</h3>
      <p className="mt-3">
        Votre demande pour le{" "}
        <strong>
          {formatDate(confirmation.date)} à {confirmation.slot}
        </strong>{" "}
        (heure de Toulouse) a bien été envoyée.
      </p>
      <p className="mt-2 text-muted-foreground">
        Vous allez recevoir un message sur WhatsApp avec votre devis.
      </p>
    </div>
  );
}
