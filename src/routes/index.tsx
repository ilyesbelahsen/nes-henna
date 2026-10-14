import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { services, priceNotice } from "@/data/services";
import { faq } from "@/data/faq";
import { reviews } from "@/data/reviews";
import { gallery } from "@/data/gallery";
import { LogoMark, Mandala } from "@/components/site/Logo";
import { Reveal } from "@/components/site/Reveal";
import { BookingForm } from "@/components/site/BookingForm";
import { GenderGate } from "@/components/site/GenderGate";
import { Footer } from "@/components/site/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      name: site.name,
      url: site.url,
      telephone: site.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.city,
        addressCountry: "FR",
      },
      areaServed: site.areaServed,
      sameAs: [site.instagram, site.googleReviewsUrl],
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: site.title },
      { name: "description", content: site.description },
      { property: "og:title", content: site.title },
      { property: "og:description", content: site.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: site.url + "/" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(jsonLd) },
    ],
  }),
  component: Index,
});

const steps = [
  {
    t: "Je choisis un modèle",
    d: "Inspirez-vous des réalisations ou de vos propres images.",
  },
  {
    t: "J'envoie mon souhait et mon rendez-vous",
    d: "Remplissez le formulaire avec vos modèles, le jour et le créneau.",
  },
  {
    t: "Je reçois mon devis sur WhatsApp",
    d: "On échange ensemble pour ajuster le motif et confirmer le prix.",
  },
];

function Index() {
  const formRef = useRef<HTMLElement>(null);
  const [formVisible, setFormVisible] = useState(false);
  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setFormVisible(entry?.isIntersecting ?? false),
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cta =
    "inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 font-medium text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5";

  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-card focus:p-3"
      >
        Aller au contenu
      </a>
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

      <main id="contenu">
        <section className="bg-hero overflow-hidden">
          <div className="container-site grid items-center gap-8 py-12 sm:py-20 md:grid-cols-2">
            <div>
              <p className="inline-block rounded-full bg-saffron px-3 py-1 text-sm font-medium text-foreground">
                Mariages · Fiançailles · Fêtes
              </p>
              <h1 className="text-display mt-4">
                L'art du <em className="text-primary">henné à Toulouse</em>,
                tracé avec soin
              </h1>
              <p className="mt-4 max-w-md text-lg text-muted-foreground">
                Des motifs traditionnels et modernes pour sublimer vos mains le
                jour de votre mariage, de vos fiançailles ou d'une fête en
                famille.
              </p>
              <a href="#rendez-vous" className={`${cta} mt-7`}>
                Prendre rendez-vous
              </a>
            </div>
            <Mandala className="mx-auto aspect-square w-full max-w-sm motion-safe:animate-[spin_120s_linear_infinite]" />
          </div>
        </section>

        <section
          id="realisations"
          className="container-site py-16"
          aria-labelledby="r-title"
        >
          <h2 id="r-title" className="text-section">
            Réalisations
          </h2>
          <noscript>
            <p className="mt-2 text-sm">
              Les photos restent floutées sans JavaScript (filtre de
              courtoisie).
            </p>
          </noscript>
          <ul className="mt-8 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-3 md:px-0">
            {gallery.map((g) => (
              <li
                key={g.caption}
                className="w-[75%] shrink-0 snap-center md:w-auto"
              >
                <figure>
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={g.src}
                      alt={g.alt}
                      width={800}
                      height={1008}
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width: 768px) 33vw, 75vw"
                      className="gated-photo aspect-[4/5] w-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-2 text-sm text-muted-foreground">
                    {g.caption}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-secondary py-16" aria-labelledby="s-title">
          <div className="container-site">
            <h2 id="s-title" className="text-section">
              Comment ça marche
            </h2>
            <ol className="mt-8 grid gap-6 md:grid-cols-3">
              {steps.map((s, i) => (
                <Reveal key={s.t}>
                  <li className="list-none">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-saffron font-display text-2xl">
                      {i + 1}
                    </span>
                    <h3 className="mt-3 text-2xl">{s.t}</h3>
                    <p className="mt-1 text-muted-foreground">{s.d}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className="container-site py-16" aria-labelledby="a-title">
          <h2 id="a-title" className="text-section">
            Avis clients
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {reviews.map((r, i) => (
              <Reveal key={i}>
                <blockquote className="h-full rounded-2xl border bg-card p-6">
                  <p>« {r.text} »</p>
                  <footer className="mt-4 text-sm text-muted-foreground">
                    — {r.author}, {r.occasion}
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
          <a
            href={site.googleReviewsUrl}
            rel="noopener"
            target="_blank"
            className="mt-6 inline-flex min-h-11 items-center underline underline-offset-4"
          >
            Voir tous les avis sur Google
          </a>
        </section>

        <section
          id="prestations"
          className="bg-secondary py-16"
          aria-labelledby="p-title"
        >
          <div className="container-site">
            <h2 id="p-title" className="text-section">
              Prestations
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {services.map((s) => (
                <Reveal key={s.name}>
                  <article className="h-full rounded-2xl border-t-4 border-t-saffron bg-card p-6 shadow-soft">
                    <h3 className="text-3xl">{s.name}</h3>
                    <p className="mt-2 text-muted-foreground">
                      {s.description}
                    </p>
                    <p className="mt-4 text-sm">
                      Durée indicative : {s.duration}
                    </p>
                    <p className="mt-1 font-display text-2xl text-primary">
                      à partir de {s.priceFrom} €
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
            <p className="mt-6 rounded-xl bg-accent p-4 font-medium text-accent-foreground">
              {priceNotice}
            </p>
          </div>
        </section>

        <section
          id="faq"
          className="container-site max-w-3xl py-16"
          aria-labelledby="f-title"
        >
          <h2 id="f-title" className="text-section">
            Questions fréquentes
          </h2>
          <div className="mt-6 divide-y border-y">
            {faq.map((f) => (
              <details key={f.q} className="group py-2">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between font-medium">
                  {f.q}
                  <span
                    aria-hidden
                    className="text-primary transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-2 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section
          id="rendez-vous"
          ref={formRef}
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
      </main>
      <Footer />

      {!formVisible && (
        <div className="fixed inset-x-0 bottom-0 z-40 p-4 safe-bottom sm:hidden">
          <a href="#rendez-vous" className={`${cta} w-full`}>
            Prendre rendez-vous
          </a>
        </div>
      )}
      <GenderGate />
    </>
  );
}
