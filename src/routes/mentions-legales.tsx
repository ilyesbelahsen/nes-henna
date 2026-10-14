import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/site/LegalLayout";
import { site } from "@/data/site";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: `Mentions légales — ${site.name}` },
      {
        name: "description",
        content: `Mentions légales du site ${site.name}, henné à Toulouse.`,
      },
      { property: "og:title", content: `Mentions légales — ${site.name}` },
      {
        property: "og:description",
        content: `Mentions légales du site ${site.name}.`,
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <LegalLayout title="Mentions légales">
      <h2>Éditrice du site</h2>
      <p>
        {site.name} — [À COMPLÉTER : nom, statut (micro-entreprise…), SIRET,
        adresse, e-mail, téléphone].
      </p>
      <h2>Directrice de la publication</h2>
      <p>[À COMPLÉTER]</p>
      <h2>Hébergement</h2>
      <p>
        Cloudflare, Inc. — 101 Townsend St, San Francisco, CA 94107, États-Unis.
        [À VÉRIFIER selon l'hébergeur final]
      </p>
      <h2>Propriété intellectuelle</h2>
      <p>
        Les photos et contenus du site sont la propriété de {site.name}, sauf
        mention contraire. Toute reproduction est interdite sans autorisation.
      </p>
    </LegalLayout>
  ),
});
