import { reviews } from "@/data/reviews";
import { site } from "@/data/site";
import { Reveal } from "./Reveal";

export function HomeReviews() {
  return (
    <section className="container-site py-16" aria-labelledby="a-title">
      <h2 id="a-title" className="text-section">
        Avis clients
      </h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {reviews.map((review, index) => (
          <Reveal key={`${review.author}-${index}`}>
            <blockquote className="h-full rounded-2xl border bg-card p-6">
              <p>« {review.text} »</p>
              <footer className="mt-4 text-sm text-muted-foreground">
                — {review.author}, {review.occasion}
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
  );
}
