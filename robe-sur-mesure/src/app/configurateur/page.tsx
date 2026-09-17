import { Suspense } from "react";
import { Configurateur } from "@/components/configurateur/Configurateur";
import { Footer, Container } from "@/components/Chrome";

export const metadata = { title: "Personnaliser ma robe" };

export default function Page() {
  return (
    <>
      <Suspense fallback={<Container className="py-10 text-center text-encre/60">Chargement…</Container>}>
        <Configurateur />
      </Suspense>
      <Footer />
    </>
  );
}

