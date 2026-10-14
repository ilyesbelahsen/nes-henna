import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Footer } from "./Footer";

export function LegalLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <header className="container-site py-6">
        <Link to="/" className="underline">
          ← Retour à l'accueil
        </Link>
      </header>
      <main
        id="contenu"
        className="container-site max-w-3xl pb-16 [&_h2]:mt-8 [&_h2]:text-3xl [&_p]:mt-3"
      >
        <h1 className="text-section">{title}</h1>
        <p className="rounded-lg bg-accent p-3 text-accent-foreground">
          Modèle à compléter et à faire valider par la prestataire.
        </p>
        {children}
      </main>
      <Footer />
    </>
  );
}
