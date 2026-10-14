import type { RefObject } from "react";
import { BookingForm } from "./BookingForm";

type Props = { sectionRef: RefObject<HTMLElement | null> };

export function HomeBooking({ sectionRef }: Props) {
  return (
    <section
      id="rendez-vous"
      ref={sectionRef}
      className="bg-hero py-16"
      aria-labelledby="rdv-title"
    >
      <div className="container-site max-w-2xl">
        <h2 id="rdv-title" className="text-section">
          Rendez-vous et devis
        </h2>
        <p className="mt-2 mb-6 text-muted-foreground">
          Envoyez votre modèle et vos disponibilités, je vous réponds sur
          WhatsApp.
        </p>
        <BookingForm />
      </div>
    </section>
  );
}
