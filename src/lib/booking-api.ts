// Isolated booking access layer. Empty VITE_PUBLIC_API_URL => demo mode.
// Server contract: GET /slots?date=YYYY-MM-DD -> { slots: string[] }
// POST /book (multipart: nom, prenom, email, telephone, images, date, creneau, website)
// -> 201 { ok, quand } | 409 slot taken | 400 invalid | 429 too many attempts
const API_URL =
  (import.meta.env["VITE_PUBLIC_API_URL"] as string | undefined)?.replace(
    /\/$/,
    "",
  ) ?? "";
export const isDemo = !API_URL;

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getSlots(
  date: string,
  signal?: AbortSignal,
): Promise<string[]> {
  if (isDemo) {
    await wait(300 + Math.random() * 400);
    const day = new Date(date + "T12:00:00").getDay();
    if (day === 0) return [];
    return ["09:00", "10:30", "14:00", "15:30", "17:00"].filter(
      (_, i) => (i + day) % 4 !== 0,
    );
  }
  const request: RequestInit = {};
  if (signal) request.signal = signal;
  const res = await fetch(
    `${API_URL}/slots?date=${encodeURIComponent(date)}`,
    request,
  );
  if (!res.ok) throw new Error("slots");
  const data = (await res.json()) as { slots?: string[] };
  return data.slots ?? [];
}

export type BookingResult =
  | { status: "ok"; when: string }
  | { status: "taken" | "invalid" | "rate" | "error"; message: string };

export async function submitBooking(
  formData: FormData,
): Promise<BookingResult> {
  if (isDemo) {
    await wait(900);
    return {
      status: "ok",
      when: `${formData.get("date")} ${formData.get("creneau")}`,
    };
  }
  try {
    const res = await fetch(`${API_URL}/book`, {
      method: "POST",
      body: formData,
    });
    if (res.status === 201) {
      const d = (await res.json()) as { quand?: string };
      return { status: "ok", when: d.quand ?? "" };
    }
    if (res.status === 409)
      return {
        status: "taken",
        message:
          "Ce créneau vient d'être réservé. Merci d'en choisir un autre.",
      };
    if (res.status === 400)
      return {
        status: "invalid",
        message:
          "Certaines informations sont invalides. Merci de vérifier le formulaire.",
      };
    if (res.status === 429)
      return {
        status: "rate",
        message:
          "Trop de tentatives. Merci de réessayer dans quelques minutes.",
      };
    return {
      status: "error",
      message: "Une erreur est survenue. Merci de réessayer.",
    };
  } catch {
    return {
      status: "error",
      message: "Connexion impossible. Vérifiez votre réseau et réessayez.",
    };
  }
}

/** Local date (not UTC) as YYYY-MM-DD. */
export function localISO(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
