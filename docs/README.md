# Docs Guide

This directory contains tracked repository documentation only.

## What Belongs Here

- stable, sanitized documentation that should travel with the repository;
- high-level architecture and system overview;
- historical reference material that explains product intent or past implementation work;
- no secrets, local machine notes, daily logs, or privileged live-only data.

## Layout

- `system-overview.md`
  - repo-oriented technical overview of the current workspace.
- `editing-site-text.md`
  - file-by-file guide for non-technical copy edits across the site.
- `reference/`
  - archived, historical, and source reference material.

## Adjacent Tracked Context

- `README.md`
  - primary developer entrypoint for commands and environment contract.
- `reference/original-request/`
  - archived source brief and technical design documents from the original build-out.
- `reference/historical/`
  - archived AI project memory and historical implementation notes.

## Canonical Operational Documentation

For live-state, sensitive, or local-only documentation, use:

- `../START-HERE-AI.local.md`
- `../documents-local/platform-dossier/`
- `../documents-local/agent-operations/`
- `../documents-local/workspace-local/`

## Rule Of Thumb

- Put durable repo-facing documentation in `docs/`.
- Put historical plans and archived reference material in `docs/reference/`.
- Put secrets, incident history, daily notes, and machine-local operational material in `documents-local/`.
