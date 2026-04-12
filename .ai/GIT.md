# Git Status Summary

## Remote

- `origin` fetch URL: `https://github.com/iperrealistico/dolcevilla-studio.git`
- `origin` push URL: `https://github.com/iperrealistico/dolcevilla-studio.git`
- Published remote branches currently include `main` and `codex/ai-photo-placeholders`.

## Local State

- `main` exists locally and tracks `origin/main`.
- Current feature work is happening on `codex/ai-photo-placeholders`, which tracks `origin/codex/ai-photo-placeholders`.
- The repository already has published history on GitHub; feature work should now continue as normal incremental commits on scoped branches.
- `.ai/` memory files are intentionally tracked as project memory for future context-cycling sessions.
- `.DS_Store`, `.next`, `node_modules`, Playwright artifacts, and environment files are ignored.

## Intended Workflow

- Use `codex/*` feature branches for future scoped work.
- Run `pnpm content:validate`, `pnpm lint`, `pnpm typecheck`, and `pnpm build` before opening a pull request.
- Use preview deployments for visual review of hero motion, mobile navigation, consent flow, and landing-page clarity.
- Merge to `main` only after content validation, static build checks, and manual QA on key pages.
