import { priceNotice, services } from "@/data/services";
import { Reveal } from "./Reveal";

export function HomeServices() {
  return (
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
          {services.map((service) => (
            <Reveal key={service.name}>
              <article className="h-full rounded-2xl border-t-4 border-t-saffron bg-card p-6 shadow-soft">
                <h3 className="text-3xl">{service.name}</h3>
                <p className="mt-2 text-muted-foreground">
                  {service.description}
                </p>
                <p className="mt-4 text-sm">
                  Durée indicative : {service.duration}
                </p>
                <p className="mt-1 font-display text-2xl text-primary">
                  à partir de {service.priceFrom} €
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
  );
}
