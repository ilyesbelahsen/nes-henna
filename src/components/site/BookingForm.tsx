import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { getSlots, submitBooking, localISO, isDemo } from "@/lib/booking-api";

const MAX_FILES = 5;
const MAX_SIZE = 10 * 1024 * 1024;
type Errors = Partial<
  Record<
    "nom" | "prenom" | "telephone" | "images" | "date" | "creneau" | "consent",
    string
  >
>;

export function BookingForm() {
  const today = new Date();
  const min = localISO(today);
  const max = localISO(
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 60),
  );

  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<string[] | null>(null);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slot, setSlot] = useState("");
  const [files, setFiles] = useState<{ file: File; url: string }[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<{ date: string; slot: string } | null>(null);
  const reqId = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!date) return;
    const id = ++reqId.current;
    const ctrl = new AbortController();
    setSlot("");
    setSlots(null);
    setSlotsLoading(true);
    getSlots(date, ctrl.signal)
      .then((s) => {
        if (id === reqId.current) setSlots(s);
      })
      .catch(() => {
        if (id === reqId.current) {
          setSlots([]);
          setStatus("Impossible de charger les créneaux.");
        }
      })
      .finally(() => {
        if (id === reqId.current) setSlotsLoading(false);
      });
    return () => ctrl.abort();
  }, [date]);

  useEffect(() => () => files.forEach((f) => URL.revokeObjectURL(f.url)), []); // eslint-disable-line react-hooks/exhaustive-deps

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next = [...files];
    let err = "";
    for (const f of Array.from(list)) {
      if (!f.type.startsWith("image/")) {
        err = "Seules les images sont acceptées.";
        continue;
      }
      if (f.size > MAX_SIZE) {
        err = `« ${f.name} » dépasse 10 Mo.`;
        continue;
      }
      if (next.length >= MAX_FILES) {
        err = "5 images maximum.";
        break;
      }
      next.push({ file: f, url: URL.createObjectURL(f) });
    }
    setFiles(next);
    setErrors((current) => {
      const nextErrors = { ...current };
      if (err) nextErrors.images = err;
      else delete nextErrors.images;
      return nextErrors;
    });
  };
  const removeFile = (i: number) => {
    const file = files[i];
    if (!file) return;
    URL.revokeObjectURL(file.url);
    setFiles(files.filter((_, j) => j !== i));
  };

  const fmtDate = (d: string) =>
    new Date(d + "T12:00:00").toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const fd = new FormData(e.currentTarget);
    const err: Errors = {};
    if (!String(fd.get("nom")).trim()) err.nom = "Merci d'indiquer votre nom.";
    if (!String(fd.get("prenom")).trim())
      err.prenom = "Merci d'indiquer votre prénom.";
    const tel = String(fd.get("telephone")).replace(/[\s.-]/g, "");
    if (!/^(\+33|0)[1-9]\d{8}$/.test(tel) && !/^\+\d{8,15}$/.test(tel))
      err.telephone = "Numéro invalide (ex. 06 12 34 56 78).";
    if (!date) err.date = "Choisissez un jour.";
    else if (!slot) err.creneau = "Choisissez un créneau.";
    if (!fd.get("consent"))
      err.consent = "Votre accord est nécessaire pour envoyer la demande.";
    setErrors(err);
    if (Object.keys(err).length) {
      setStatus("Le formulaire contient des erreurs.");
      formRef.current
        ?.querySelector<HTMLElement>("[aria-invalid='true']")
        ?.focus();
      return;
    }
    fd.delete("images");
    files.forEach((f) => fd.append("images", f.file));
    fd.set("date", date);
    fd.set("creneau", slot);
    fd.delete("consent");
    setSending(true);
    setStatus("Envoi en cours…");
    const r = await submitBooking(fd);
    setSending(false);
    if (r.status === "ok") {
      setDone({ date, slot });
      setStatus("Demande envoyée.");
      return;
    }
    setStatus(r.message);
    if (r.status === "taken") {
      setSlot("");
      setSlots((s) => s?.filter((x) => x !== slot) ?? null);
    }
  };

  const field =
    "mt-1 block min-h-12 w-full rounded-xl border border-input bg-card px-4 text-base";
  const errEl = (k: keyof Errors) =>
    errors[k] && (
      <p id={`${k}-err`} className="mt-1 text-sm text-destructive">
        {errors[k]}
      </p>
    );
  const a = (k: keyof Errors) => ({
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `${k}-err` : undefined,
  });

  if (done) {
    return (
      <div
        className="rounded-2xl border bg-card p-6 text-center shadow-soft"
        role="status"
      >
        <h3 className="text-3xl">Merci, c'est noté !</h3>
        <p className="mt-3">
          Votre demande pour le{" "}
          <strong>
            {fmtDate(done.date)} à {done.slot}
          </strong>{" "}
          (heure de Toulouse) a bien été envoyée.
        </p>
        <p className="mt-2 text-muted-foreground">
          Vous allez recevoir un message sur WhatsApp avec votre devis.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="grid gap-5 rounded-2xl border bg-card p-5 shadow-soft sm:p-8"
    >
      {isDemo && (
        <p className="rounded-lg bg-secondary px-3 py-2 text-sm text-secondary-foreground">
          Mode démonstration : aucune demande n'est réellement envoyée.
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Nom
          <input
            name="nom"
            autoComplete="family-name"
            className={field}
            {...a("nom")}
          />
          {errEl("nom")}
        </label>
        <label className="block text-sm font-medium">
          Prénom
          <input
            name="prenom"
            autoComplete="given-name"
            className={field}
            {...a("prenom")}
          />
          {errEl("prenom")}
        </label>
      </div>
      <label className="block text-sm font-medium">
        Téléphone (WhatsApp)
        <input
          name="telephone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          className={field}
          {...a("telephone")}
        />
        {errEl("telephone")}
      </label>

      <div>
        <label className="block text-sm font-medium">
          Modèles souhaités{" "}
          <span className="font-normal text-muted-foreground">
            (5 images max, 10 Mo chacune)
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            disabled={files.length >= MAX_FILES}
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = "";
            }}
            className="mt-1 block w-full text-sm file:mr-3 file:min-h-11 file:rounded-full file:border-0 file:bg-secondary file:px-4 file:text-secondary-foreground"
            {...a("images")}
          />
        </label>
        {errEl("images")}
        {files.length > 0 && (
          <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
            {files.map((f, i) => (
              <li key={f.url} className="relative">
                <img
                  src={f.url}
                  alt={`Modèle ${i + 1} : ${f.file.name}`}
                  width={120}
                  height={120}
                  className="aspect-square w-full rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  aria-label={`Retirer ${f.file.name}`}
                  className="absolute right-1 top-1 h-11 w-11 rounded-full bg-card/90 text-lg"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <label className="block text-sm font-medium">
        Jour souhaité
        <input
          type="date"
          min={min}
          max={max}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={field}
          {...a("date")}
        />
        {errEl("date")}
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
        {slotsLoading && (
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
            {slots.map((s) => (
              <label
                key={s}
                className={`flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-sm ${slot === s ? "border-primary bg-primary text-primary-foreground" : "bg-card"}`}
              >
                <input
                  type="radio"
                  name="creneau-pick"
                  value={s}
                  checked={slot === s}
                  onChange={() => setSlot(s)}
                  className="sr-only"
                />
                {s}
              </label>
            ))}
          </div>
        )}
        {errEl("creneau")}
      </fieldset>

      {/* Honeypot */}
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
          {...a("consent")}
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
      {errEl("consent")}

      <p className="text-sm text-muted-foreground">
        Après votre demande, vous recevrez un message automatique sur WhatsApp
        et l'artiste reçoit toutes les informations par e-mail.
      </p>

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
