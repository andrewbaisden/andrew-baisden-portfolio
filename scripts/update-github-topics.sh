#!/usr/bin/env bash
# Replace GitHub repository topics for andrewbaisden/andrew-baisden-portfolio.
#
# Audited from the current frontend stack (Next.js App Router + London hero):
#   next, react, typescript, custom CSS + SVG, WAAPI hero animation,
#   dark mode, Zod + react-hook-form contact flow, Resend email,
#   Netlify Functions / serverless.
#
# Requires: GitHub CLI (`gh`) authenticated with repo scope.
# Optional: jq (prettier dry-run / verification output).
#
# Usage:
#   chmod +x scripts/update-github-topics.sh
#   ./scripts/update-github-topics.sh --dry-run
#   ./scripts/update-github-topics.sh

set -euo pipefail

REPO="${REPO:-andrewbaisden/andrew-baisden-portfolio}"
DRY_RUN=0

if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=1
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "error: gh CLI not found. Install from https://cli.github.com/ then run: gh auth login" >&2
  exit 1
fi

# GitHub allows max 20 topics. Lowercase + hyphens only.
TOPICS=(
  nextjs
  react
  typescript
  portfolio
  personal-website
  frontend
  css
  svg
  animation
  web-animation-api
  dark-mode
  accessibility
  zod
  react-hook-form
  resend
  netlify
  serverless
  contact-form
  web-design
  portfolio-website
)

echo "Repository: ${REPO}"
echo "Topics (${#TOPICS[@]}):"
printf '  - %s\n' "${TOPICS[@]}"
echo

if [[ "${#TOPICS[@]}" -gt 20 ]]; then
  echo "error: GitHub allows at most 20 topics (got ${#TOPICS[@]})" >&2
  exit 1
fi

# gh --raw-field / -f with names[]= replaces poorly; use JSON body via --input.
json_escape() {
  # Minimal JSON string escape for topic tokens (already safe: [a-z0-9-]).
  printf '"%s"' "$1"
}

NAMES_CSV=""
for i in "${!TOPICS[@]}"; do
  if [[ "$i" -gt 0 ]]; then
    NAMES_CSV+=","
  fi
  NAMES_CSV+=$(json_escape "${TOPICS[$i]}")
done
PAYLOAD="{\"names\":[${NAMES_CSV}]}"

if [[ "${DRY_RUN}" -eq 1 ]]; then
  echo "Dry run — payload that would be sent:"
  if command -v jq >/dev/null 2>&1; then
    echo "${PAYLOAD}" | jq .
  else
    echo "${PAYLOAD}"
  fi
  echo
  echo "Current topics:"
  if command -v jq >/dev/null 2>&1; then
    gh api "repos/${REPO}/topics" -H "Accept: application/vnd.github+json" | jq .
  else
    gh api "repos/${REPO}/topics" -H "Accept: application/vnd.github+json"
  fi
  exit 0
fi

echo "Updating topics via GitHub API (PUT replaces the full topic set)..."
RESPONSE=$(
  gh api \
    --method PUT \
    -H "Accept: application/vnd.github+json" \
    "repos/${REPO}/topics" \
    --input - <<<"${PAYLOAD}"
)

if command -v jq >/dev/null 2>&1; then
  echo "${RESPONSE}" | jq .
else
  echo "${RESPONSE}"
fi

echo
echo "Done. View at: https://github.com/${REPO}"
