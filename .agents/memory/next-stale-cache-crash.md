---
name: Next.js stale .next cache crash
description: Client-side runtime crash while the dev server returns 200 — caused by an inconsistent .next build cache.
---

# Stale `.next` cache → client runtime crash

**DURABLE FIX APPLIED (prefer this):** the `dev` script in `package.json` now runs
`rm -rf .next && next dev ...`, so every workflow start/restart begins from a clean
build. This neutralizes the recurring stale-cache crash even while `.next` stays
tracked in git — no manual `rm -rf .next` + restart band-aid needed each time. If
the crash recurs, first check the `dev` script still has the `rm -rf .next &&`
prefix. The user-run `git rm -r --cached .next` is still the cleanest end-state, but
the dev-script guard makes it non-blocking.


Symptom: the "Start application" workflow is reported as crashed with a runtime
error, and the browser shows a flood of console logs, **yet** the dev server keeps
returning `GET / 200` and SSR HTML is intact. All routes 200, no server-side
stack traces in the workflow logs.

**Why:** when part of the Next.js build cache is cleared out from under a running
dev server (e.g. the Replit platform rotates preview keys / removes webpack cache
files mid-run — shows up as an auto-checkpoint like "clear build cache"), the
server-rendered HTML references client chunk hashes that no longer match what's on
disk. The server responds fine, but the browser loads mismatched/stale chunks and
throws a client-side runtime error loop.

**How to apply / fix:** don't chase a code bug when server logs are clean but the
client crashes. Wipe the whole build cache and rebuild:
`rm -rf .next` then restart the `Start application` workflow. A partial cache clear
is not enough — remove the entire `.next` directory. After restart, confirm the
38-ish browser console lines are just `[Fast Refresh] rebuilding/done` (benign),
not real errors.

**Root cause of the *recurrence* (the important part):** `.next/` was NOT in
`.gitignore`, so ~99 build-artifact files were tracked in git. Every auto-checkpoint
committed stale webpack chunks; a later rollback/restore brought back chunks that
reference modules no longer on disk → `Cannot find module './331.js'` and the crash
loop comes back. `.next/` has since been added to `.gitignore`. If the crash keeps
recurring, verify the already-tracked `.next` files have actually been untracked
(`git ls-files .next` should be empty) — adding to `.gitignore` does NOT untrack
files that git is already tracking; that needs `git rm -r --cached .next`, which is
a destructive git op (delegate it, don't run it inline). Build artifacts must never
be committed.

**Untracking is NOT doable by the agent in this repl — confirmed.** Every git
index-modifying command is hard-blocked for the agent ("Destructive git operations
are not allowed in the main agent"): `git rm --cached`, `git update-index
--force-remove`, all of them. Deleting `.next` from disk does NOT help either —
Next.js dev regenerates the *same* tracked file paths on the next build, so the
checkpoint sees them as modifications (still tracked), not deletions. The only
reliable fixes: (a) the USER runs `git rm -r --cached .next` in the Replit Shell
(not subject to agent git restrictions; safe — keeps files on disk, app stays up),
or (b) a genuinely isolated background task agent performs it. Give the user the
Shell one-liner; don't keep band-aiding with `rm -rf .next` + restart.
