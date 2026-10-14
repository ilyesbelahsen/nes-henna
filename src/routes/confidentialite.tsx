import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/site/LegalLayout";
import { site } from "@/data/site";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [
      { title: `Politique de confidentialité — ${site.name}` },
      {
        name: "description",
        content: `Comment ${site.name} traite vos données et vos photos.`,
      },
      { property: "og:title", content: `Confidentialité — ${site.name}` },
      {
        property: "og:description",
        content: `Comment ${site.name} traite vos données.`,
      },
    ],
  }),
  component: () => (
    <LegalLayout title="Politique de confidentialité">
      <h2>Données collectées</h2>
      <p>
        Via le formulaire : nom, prénom, numéro de téléphone, jour et créneau
        souhaités et images de modèles que vous envoyez.
      </p>
      <h2>Finalité</h2>
      <p>
        Établir votre devis, organiser le rendez-vous et vous contacter sur
        WhatsApp. Base légale : votre consentement et les mesures
        précontractuelles.
      </p>
      <h2>Durée de conservation</h2>
      <p>[À COMPLÉTER : ex. 12 mois après le dernier contact]</p>
      <h2>Destinataires</h2>
      <p>
        Uniquement {site.name}. Sous-traitants : [À COMPLÉTER : hébergeur,
        messagerie WhatsApp, service e-mail].
      </p>
      <h2>Choix d'affichage des photos</h2>
      <p>
        Votre choix (« Je suis une femme » ou non) est enregistré uniquement
        dans votre navigateur (stockage local). Il n'est jamais transmis à nous
        ni à un outil de statistiques. Vous pouvez le modifier depuis le pied de
        page.
      </p>
      <h2>Cookies</h2>
      <p>Ce site n'utilise aucun cookie ni traceur.</p>
      <h2>Vos droits</h2>
      <p>
        Accès, rectification, effacement, opposition : contactez [À COMPLÉTER].
        Vous pouvez aussi saisir la CNIL (cnil.fr).
      </p>
    </LegalLayout>
  ),
});
