import { Link } from "@tanstack/react-router";
import { site } from "@/data/site";
import { LogoMark } from "./Logo";
import { GATE_KEY, OPEN_GATE_EVENT } from "./GenderGate";

export function Footer() {
  const reopen = () => {
    localStorage.removeItem(GATE_KEY);
    document.documentElement.dataset["photos"] = "blurred";
    window.dispatchEvent(new Event(OPEN_GATE_EVENT));
  };
  return (
    <footer className="border-t bg-secondary pb-28 pt-12 sm:pb-12">
      <div className="container-site grid gap-6 text-sm sm:grid-cols-3">
        <div className="flex items-center gap-3">
          <LogoMark />
          <span className="font-display text-2xl">{site.name}</span>
        </div>
        <address className="not-italic">
          Téléphone : {site.phone}
          <br />
          Instagram : {site.instagram}
          <br />
          Zone : {site.areaText}
        </address>
        <nav aria-label="Liens légaux" className="flex flex-col gap-2">
          <Link to="/mentions-legales" className="underline">
            Mentions légales
          </Link>
          <Link to="/confidentialite" className="underline">
            Confidentialité
          </Link>
          <button
            onClick={reopen}
            className="text-left text-muted-foreground underline"
          >
            Modifier mon choix d'affichage des photos
          </button>
        </nav>
      </div>
      <p className="container-site mt-8 text-xs text-muted-foreground">
        © {new Date().getFullYear()} {site.name} — Henné à {site.city}
      </p>
    </footer>
  );
}
