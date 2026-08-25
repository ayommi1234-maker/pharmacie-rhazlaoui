"use client";

import { useState } from "react";
import { effacerConfig } from "@/lib/storage";
import { Button, Notice } from "@/components/ui";

export function EffacerDonnees() {
  const [fait, setFait] = useState(false);
  return (
    <div className="space-y-2">
      <Button
        variante="danger"
        onClick={() => {
          effacerConfig();
          setFait(true);
        }}
      >
        Effacer mes informations
      </Button>
      {fait && <Notice tone="info">Vos informations enregistrées sur cet appareil ont été effacées.</Notice>}
    </div>
  );
}
