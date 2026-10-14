import { faq } from "@/data/faq";

export function HomeFaq() {
  return (
    <section
      id="faq"
      className="container-site max-w-3xl py-16"
      aria-labelledby="f-title"
    >
      <h2 id="f-title" className="text-section">
        Questions fréquentes
      </h2>
      <div className="mt-6 divide-y border-y">
        {faq.map((item) => (
          <details key={item.q} className="group py-2">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between font-medium">
              {item.q}
              <span
                aria-hidden
                className="text-primary transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="pb-2 text-muted-foreground">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
