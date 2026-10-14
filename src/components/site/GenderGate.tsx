import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

/*
 * Courtesy filter, NOT a technical protection: images are still downloadable.
 * The choice lives only in this browser's localStorage and is never sent anywhere.
 */
export const GATE_KEY = "nas-photos-choice"; // "female" | "declined"
export const OPEN_GATE_EVENT = "nas:open-gate";

export function GenderGate() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"ask" | "confirm">("ask");
  const [checked, setChecked] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!localStorage.getItem(GATE_KEY)) setOpen(true);
    const reopen = () => {
      setStep("ask");
      setChecked(false);
      setOpen(true);
    };
    window.addEventListener(OPEN_GATE_EVENT, reopen);
    return () => window.removeEventListener(OPEN_GATE_EVENT, reopen);
  }, []);

  useEffect(() => {
    if (open)
      panelRef.current
        ?.querySelector<HTMLElement>("input,button")
        ?.focus({ preventScroll: true });
  }, [open, step]);

  const decide = (choice: "female" | "declined") => {
    localStorage.setItem(GATE_KEY, choice);
    document.documentElement.dataset["photos"] =
      choice === "female" ? "visible" : "blurred";
    setOpen(false);
  };

  if (!open) return null;
  return (
    <div
      ref={panelRef}
      role="region"
      aria-labelledby="gate-title"
      className="fixed inset-x-0 bottom-0 z-50 border-t bg-card shadow-soft safe-bottom"
      onKeyDown={(e) => e.key === "Escape" && decide("declined")}
    >
      <div className="container-site py-4">
        <h2 id="gate-title" className="text-xl">
          Photos de réalisations
        </h2>
        {step === "ask" ? (
          <>
            <p className="mt-1 text-sm text-muted-foreground">
              Par respect d'un principe religieux, les photos de réalisations
              sont réservées aux femmes. Merci de votre compréhension.
            </p>
            <label className="mt-3 flex min-h-11 items-center gap-3 text-sm">
              <input
                id="gender-gate-confirmation"
                type="checkbox"
                className="h-5 w-5 accent-[var(--primary)]"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              Je suis une femme
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                disabled={!checked}
                onClick={() => setStep("confirm")}
                className="min-h-11 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground disabled:opacity-50"
              >
                Confirmer
              </button>
              <button
                onClick={() => decide("declined")}
                className="min-h-11 rounded-full px-4 text-sm underline underline-offset-4"
              >
                Non, continuer avec les photos floutées
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="mt-1 text-sm text-muted-foreground">
              Il s'agit d'une déclaration sur l'honneur : vous en êtes
              responsable.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => decide("female")}
                className="min-h-11 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground"
              >
                Je confirme que je suis une femme
              </button>
              <button
                onClick={() => decide("declined")}
                className="min-h-11 rounded-full px-4 text-sm underline underline-offset-4"
              >
                Continuer avec les photos floutées
              </button>
            </div>
          </>
        )}
        <p className="mt-2 text-xs text-muted-foreground">
          Ce choix reste uniquement sur votre appareil.{" "}
          <Link to="/confidentialite" className="underline">
            En savoir plus
          </Link>
        </p>
      </div>
    </div>
  );
}
