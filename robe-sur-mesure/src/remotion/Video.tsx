import React from "react";
import {
  AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile, Img,
} from "remotion";
import { BOUTIQUE, estPlaceholder } from "../config/boutique";

export const FPS = 30;

/**
 * PHOTOS : ajoutez ici les noms de vos fichiers placés dans /public/video-assets
 * (ex : "robe-1.jpg"). Laissé VIDE, la pub s'affiche avec des fonds élégants de
 * secours et reste exportable sans aucune image. N'ajoutez que des médias dont
 * vous détenez les droits.
 */
const PHOTOS: string[] = [
  "robe-1.png",  // scène 1 — l'accroche
  "modele.png",  // scène 2 — choisir son modèle
  "mesures.png", // scène 3 — prendre ses mesures
  "",            // scène 4 — envoi WhatsApp (fond dégradé)
  "robe-1.png",  // scène 5 — la robe finale
];

// Durées des scènes (frames @30fps)
const D = { s1: 90, s2: 120, s3: 150, s4: 120, s5: 120, s6: 90 };
export const DUREE_FRAMES = D.s1 + D.s2 + D.s3 + D.s4 + D.s5 + D.s6; // 690 = 23 s

const COUL = {
  creme: "#FBF7F0",
  ivoire: "#F3ECE1",
  encre: "#2B2320",
  bordeaux: "#7A2E33",
  dore: "#B9975B",
};

// Zones de sécurité Reels/TikTok : on garde le texte au centre.
const SAFE: React.CSSProperties = {
  paddingTop: 260,
  paddingBottom: 420,
  paddingLeft: 90,
  paddingRight: 90,
};

function Fond({ from, to, photoIndex }: { from: string; to: string; photoIndex?: number }) {
  const photo = photoIndex !== undefined ? PHOTOS[photoIndex] : undefined;
  if (photo) {
    return (
      <AbsoluteFill>
        <Img src={staticFile(`video-assets/${photo}`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.72))" }} />
      </AbsoluteFill>
    );
  }
  return <AbsoluteFill style={{ background: `linear-gradient(160deg, ${from}, ${to})` }} />;
}

function Silhouette({ color = COUL.dore, opacity = 0.5 }: { color?: string; opacity?: number }) {
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <svg width="520" height="900" viewBox="0 0 160 260" fill="none" stroke={color} strokeWidth="1.5">
        <circle cx="80" cy="24" r="14" />
        <path d="M80 38 L52 66 L60 78 L60 150 Q80 162 100 150 L100 78 L108 66 Z" />
        <path d="M60 150 L44 235 M100 150 L116 235" />
      </svg>
    </AbsoluteFill>
  );
}

function Scene({
  dur, from, to, photoIndex, sur, titre, sousTitre, couleurTitre = "#fff", montrerSilhouette = true,
}: {
  dur: number; from: string; to: string; photoIndex?: number; sur?: string;
  titre: string; sousTitre?: string; couleurTitre?: string; montrerSilhouette?: boolean;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const apparition = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: "clamp" });
  const sortie = interpolate(frame, [dur - 14, dur], [1, 0], { extrapolateLeft: "clamp" });
  const opacity = Math.min(apparition, sortie);
  const monte = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 30 });
  const y = interpolate(monte, [0, 1], [40, 0]);
  const aPhoto = photoIndex !== undefined && Boolean(PHOTOS[photoIndex]);

  return (
    <AbsoluteFill>
      <Fond from={from} to={to} photoIndex={photoIndex} />
      {montrerSilhouette && !aPhoto && <Silhouette />}
      <AbsoluteFill style={{ ...SAFE, alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div style={{ opacity, transform: `translateY(${y}px)` }}>
          {sur && (
            <div style={{ color: COUL.dore, fontFamily: "Georgia, serif", fontSize: 34, letterSpacing: 4, marginBottom: 18, textTransform: "uppercase" }}>
              {sur}
            </div>
          )}
          <div style={{ color: couleurTitre, fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 74, lineHeight: 1.15, textShadow: "0 2px 18px rgba(0,0,0,0.35)" }}>
            {titre}
          </div>
          {sousTitre && (
            <div style={{ color: couleurTitre, opacity: 0.9, fontFamily: "Segoe UI, system-ui, sans-serif", fontSize: 38, marginTop: 22 }}>
              {sousTitre}
            </div>
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

export const PubRobe: React.FC = () => {
  const nom = estPlaceholder(BOUTIQUE.nom) ? "Votre Boutique" : BOUTIQUE.nom;
  let t = 0;
  const at = (d: number) => {
    const from = t;
    t += d;
    return { from, durationInFrames: d };
  };

  return (
    <AbsoluteFill style={{ backgroundColor: COUL.encre }}>
      <Sequence {...at(D.s1)}>
        <Scene dur={D.s1} from="#3a2226" to={COUL.bordeaux} photoIndex={0}
          titre="Une robe magnifique…" sousTitre="mais jamais à votre taille ?" />
      </Sequence>

      <Sequence {...at(D.s2)}>
        <Scene dur={D.s2} from={COUL.ivoire} to="#E4D6C2" photoIndex={1}
          sur="Étape 1" titre="Choisissez votre modèle préféré" />
      </Sequence>

      <Sequence {...at(D.s3)}>
        <Scene dur={D.s3} from="#26324D" to="#141c2e" photoIndex={2}
          sur="Étape 2" titre="Entrez simplement vos mensurations" sousTitre="Guidé pas à pas, en cm ou en m" />
      </Sequence>

      <Sequence {...at(D.s4)}>
        <Scene dur={D.s4} from="#1F6E5A" to="#123f33" photoIndex={3}
          sur="Étape 3" titre="Envoyez votre demande" sousTitre="en quelques minutes, sur WhatsApp" />
      </Sequence>

      <Sequence {...at(D.s5)}>
        <Scene dur={D.s5} from="#3a2226" to={COUL.bordeaux} photoIndex={4}
          titre="Confectionnée spécialement pour vous" />
      </Sequence>

      <Sequence {...at(D.s6)}>
        <Scene dur={D.s6} from={COUL.bordeaux} to="#4d1d21" montrerSilhouette={false}
          titre={nom} sousTitre="Choisissez votre robe — commande et confirmation sur WhatsApp" />
      </Sequence>

      {/*
        MUSIQUE (facultatif) : placez un fichier libre de droits dans
        /public/video-assets (ex : music.mp3), puis décommentez :
        <Audio src={staticFile("music.mp3")} volume={0.5} />
        (importer Audio depuis "remotion")
      */}
    </AbsoluteFill>
  );
};

