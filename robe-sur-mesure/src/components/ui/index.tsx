"use client";

import React from "react";
import { btn, type Variante } from "./btn";

/* Le helper `btn` vit dans un module neutre (utilisable côté serveur). */
export { btn };
export type { Variante };

export function Button({
  variante = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variante?: Variante }) {
  return <button className={btn(variante, className)} {...props} />;
}

/* ---------- Carte ---------- */
export function Card({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-xl2 bg-white/70 border border-encre/10 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

/* ---------- Carte sélectionnable ---------- */
export function SelectCard({
  selected,
  onClick,
  disabled,
  children,
  ariaLabel,
}: {
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      aria-label={ariaLabel}
      className={`text-left rounded-xl2 border p-3 min-h-[48px] transition-colors w-full ${
        selected
          ? "border-bordeaux ring-2 ring-bordeaux/40 bg-bordeaux/5"
          : "border-encre/15 bg-white/60 hover:border-bordeaux/40"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
}

/* ---------- Puce d'information ---------- */
export function Chip({ children, tone = "neutre" }: { children: React.ReactNode; tone?: "neutre" | "ok" | "attention" }) {
  const tones = {
    neutre: "bg-encre/10 text-encre",
    ok: "bg-sauge/20 text-[#3c4a36]",
    attention: "bg-terracotta/20 text-[#7a3e1f]",
  };
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>{children}</span>;
}

/* ---------- Encadré (info / avertissement) ---------- */
export function Notice({
  tone = "info",
  children,
}: {
  tone?: "info" | "attention" | "erreur";
  children: React.ReactNode;
}) {
  const tones = {
    info: "bg-sauge/10 border-sauge/40 text-encre",
    attention: "bg-terracotta/10 border-terracotta/40 text-[#6d3a20]",
    erreur: "bg-bordeaux/10 border-bordeaux/40 text-bordeaux",
  };
  return (
    <div role={tone === "erreur" ? "alert" : "note"} className={`rounded-xl2 border px-4 py-3 text-sm ${tones[tone]}`}>
      {children}
    </div>
  );
}

/* ---------- Barre de progression ---------- */
export function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div>
      <div
        className="h-2 w-full rounded-full bg-encre/10 overflow-hidden"
        role="progressbar"
        aria-valuenow={current + 1}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Étape ${current + 1} sur ${total}`}
      >
        <div className="h-full bg-bordeaux transition-all" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-1 text-xs text-encre/60">
        Étape {current + 1} sur {total}
      </p>
    </div>
  );
}

/* ---------- Champ de formulaire ---------- */
let idc = 0;
function useId(prefix: string) {
  const [id] = React.useState(() => `${prefix}-${++idc}`);
  return id;
}

export function Field({
  label,
  description,
  error,
  children,
  htmlFor,
}: {
  label: string;
  description?: string;
  error?: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={htmlFor} className="block text-sm font-semibold">
        {label}
      </label>
      {description && <p className="text-xs text-encre/60">{description}</p>}
      {children}
      {error && (
        <p className="text-xs text-bordeaux" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl2 border border-encre/20 bg-white px-3 py-3 text-base min-h-[48px] focus-visible:border-bordeaux ${props.className ?? ""}`}
    />
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-xl2 border border-encre/20 bg-white px-3 py-3 text-base min-h-[80px] focus-visible:border-bordeaux ${props.className ?? ""}`}
    />
  );
}

export { useId };
