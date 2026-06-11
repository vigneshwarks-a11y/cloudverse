---
name: Next.js stale .next cache crash
description: Recurring dev crash from the platform restoring a tracked/stale build dir under a running server, and why the fix is distDir (not untracking).
---

# Stale build-dir → client runtime crash

**Crash signature (the durable diagnostic):** the dev server keeps returning `200`
and SSR HTML is intact, but the browser console floods with
`__webpack_modules__[moduleId] is not a function` / `Cannot find module './331.js'`.
When server logs are clean but only the client crashes, do NOT chase a code bug — it
is a build-cache mismatch, not application logic.

**Why it recurs here:** Next's build dir was committed to git before it was
gitignored, so it stayed *tracked*. The platform checkpoint/rollback system keeps
capturing it and a rollback restores stale chunks under the running dev server →
crash loop. Gitignore alone never untracks an already-tracked dir.

**Decision / fix:** move Next's live build output OFF the default `.next` to a
gitignored `distDir` (in `next.config.mjs`). The runtime then reads a dir the
checkpoint system never captures or restores, so rollbacks cannot crash it.
**Why this over untracking:** the main agent is hard-blocked from every git index
op *and* from deleting tracked files ("Destructive git operations are not allowed in
the main agent"), so `git rm --cached .next` is impossible from here — but changing
distDir needs no git and fixes the runtime cause directly. Untracking the old dir,
if still wanted, must run in an isolated/background task (or the user's Shell).

**Also relevant:** committed Next build artifacts include preview/signing material
(prerender-manifest, server-reference-manifest, .rscinfo) — build output should
never be versioned. And `experimental.devtoolSegmentExplorer: false` is kept on:
the Next 15.5.x dev Segment Explorer devtool corrupts its RSC manifest during heavy
HMR and produces a similar one-off 500→200 blip (`⨯` in the dev banner = disabled,
not an error).

**If it recurs, a single workflow restart clears transient cache; then verify the
distDir is still gitignored and the dev script still clears the old dir on start.**
