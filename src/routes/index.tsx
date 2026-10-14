import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { faq } from "@/data/faq";
import { site } from "@/data/site";
import { Footer } from "@/components/site/Footer";
import { GenderGate } from "@/components/site/GenderGate";
import { HomeBooking } from "@/components/site/HomeBooking";
import { HomeFaq } from "@/components/site/HomeFaq";
import { HomeGallery } from "@/components/site/HomeGallery";
import { HomeHero } from "@/components/site/HomeHero";
import { HomeHowItWorks } from "@/components/site/HomeHowItWorks";
import { HomeReviews } from "@/components/site/HomeReviews";
import { HomeServices } from "@/components/site/HomeServices";
import { useBookingVisibility } from "@/components/site/use-booking-visibility";
import { CTA_CLASS_NAME } from "@/components/site/home.constants";

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
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
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
    links: [{ rel: "canonical", href: `${site.url}/` }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(jsonLd) },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const bookingRef = useRef<HTMLElement>(null);
  const bookingVisible = useBookingVisibility(bookingRef);
  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-card focus:p-3"
      >
        Aller au contenu
      </a>
      <HomeHero />
      <main id="contenu">
        <HomeGallery />
        <HomeHowItWorks />
        <HomeReviews />
        <HomeServices />
        <HomeFaq />
        <HomeBooking sectionRef={bookingRef} />
      </main>
      <Footer />
      {!bookingVisible && (
        <div className="fixed inset-x-0 bottom-0 z-40 p-4 safe-bottom sm:hidden">
          <a href="#rendez-vous" className={`${CTA_CLASS_NAME} w-full`}>
            Prendre rendez-vous
          </a>
        </div>
      )}
      <GenderGate />
    </>
  );
}
