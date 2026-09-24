#!/usr/bin/env bash
# Installe la mémoire de Baounna (AGENTS.md v1.11, 23/09/2026) pour Claude Code.
#
#   ./installer-memoire.sh              → mémoire utilisateur (~/.claude/CLAUDE.md), tous projets
#   ./installer-memoire.sh /chemin/repo → mémoire projet (<repo>/CLAUDE.md), ce dépôt seulement
#
# Le script n'écrase jamais un CLAUDE.md existant : il y ajoute la section
# si elle manque, et ne fait rien si elle est déjà là.
set -euo pipefail
SOURCE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/AGENTS-baounna.md"
[ -f "$SOURCE" ] || { echo "Introuvable : $SOURCE" >&2; exit 1; }
TITRE="## Préférences globales de Baounna Abdellah (AGENTS.md v1.11, 23/09/2026)"

if [ $# -eq 0 ]; then
  CIBLE="$HOME/.claude/CLAUDE.md"; PORTEE="utilisateur (tous les projets)"
  mkdir -p "$HOME/.claude"
  cp "$SOURCE" "$HOME/.claude/AGENTS-baounna.md"
else
  [ -d "$1" ] || { echo "Dossier introuvable : $1" >&2; exit 1; }
  CIBLE="$1/CLAUDE.md"; PORTEE="projet $1"
  mkdir -p "$1/.claude"
  cp "$SOURCE" "$1/.claude/AGENTS-baounna.md"
fi

if [ -f "$CIBLE" ] && grep -qF "$TITRE" "$CIBLE"; then
  echo "Déjà installée dans $CIBLE — rien à faire."; exit 0
fi

{ [ -f "$CIBLE" ] && echo; echo "$TITRE"
  echo "Copie de référence : \`.claude/AGENTS-baounna.md\`."
  echo
  sed -n '/^## Rôle/,$p' "$SOURCE"
} >> "$CIBLE"

echo "Mémoire $PORTEE installée dans $CIBLE ($(wc -l < "$CIBLE") lignes)."
