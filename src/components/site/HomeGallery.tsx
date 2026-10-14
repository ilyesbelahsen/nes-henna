import { gallery } from "@/data/gallery";

export function HomeGallery() {
  return (
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
          Les photos restent floutées sans JavaScript (filtre de courtoisie).
        </p>
      </noscript>
      <ul className="mt-8 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-3 md:px-0">
        {gallery.map((item) => (
          <li
            key={item.caption}
            className="w-[75%] shrink-0 snap-center md:w-auto"
          >
            <figure>
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={item.src}
                  alt={item.alt}
                  width={800}
                  height={1008}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 768px) 33vw, 75vw"
                  className="gated-photo aspect-[4/5] w-full object-cover"
                />
              </div>
              <figcaption className="mt-2 text-sm text-muted-foreground">
                {item.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
