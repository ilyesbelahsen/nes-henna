import { site } from "@/data/site";
import { LogoMark, Mandala } from "./Logo";
import { CTA_CLASS_NAME } from "./home.constants";

export function HomeHero() {
  return (
    <>
      <header
        className="container-site flex items-center justify-between py-4"
        style={{ paddingTop: "max(1rem, env(safe-area-inset-top))" }}
      >
        <a href="#" className="flex items-center gap-2">
          <LogoMark />
          <span className="font-display text-2xl">{site.name}</span>
        </a>
        <nav aria-label="Principale" className="hidden gap-6 text-sm sm:flex">
          <a href="#realisations">Réalisations</a>
          <a href="#prestations">Prestations</a>
          <a href="#faq">FAQ</a>
        </nav>
      </header>
      <section className="bg-hero overflow-hidden">
        <div className="container-site grid items-center gap-8 py-12 sm:py-20 md:grid-cols-2">
          <div>
            <p className="inline-block rounded-full bg-saffron px-3 py-1 text-sm font-medium text-foreground">
              Mariages · Fiançailles · Fêtes
            </p>
            <h1 className="text-display mt-4">
              L'art du <em className="text-primary">henné à Toulouse</em>, tracé
              avec soin
            </h1>
            <p className="mt-4 max-w-md text-lg text-muted-foreground">
              Des motifs traditionnels et modernes pour sublimer vos mains le
              jour de votre mariage, de vos fiançailles ou d'une fête en
              famille.
            </p>
            <a href="#rendez-vous" className={`${CTA_CLASS_NAME} mt-7`}>
              Prendre rendez-vous
            </a>
          </div>
          <Mandala className="mx-auto aspect-square w-full max-w-sm motion-safe:animate-[spin_120s_linear_infinite]" />
        </div>
      </section>
    </>
  );
}
