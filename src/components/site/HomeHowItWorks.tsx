import { Reveal } from "./Reveal";

const steps = [
  {
    title: "Je choisis un modèle",
    description: "Inspirez-vous des réalisations ou de vos propres images.",
  },
  {
    title: "J'envoie mon souhait et mon rendez-vous",
    description:
      "Remplissez le formulaire avec vos modèles, le jour et le créneau.",
  },
  {
    title: "Je reçois mon devis sur WhatsApp",
    description:
      "On échange ensemble pour ajuster le motif et confirmer le prix.",
  },
];

export function HomeHowItWorks() {
  return (
    <section className="bg-secondary py-16" aria-labelledby="s-title">
      <div className="container-site">
        <h2 id="s-title" className="text-section">
          Comment ça marche
        </h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.title}>
              <li className="list-none">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-saffron font-display text-2xl">
                  {index + 1}
                </span>
                <h3 className="mt-3 text-2xl">{step.title}</h3>
                <p className="mt-1 text-muted-foreground">{step.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
