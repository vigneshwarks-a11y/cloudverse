"use client";

/* Animated workflow visual — a mixed flow-chart: trigger card → (horizontal
   arrow) → web agent, curving down into a centred custom-agent card, then
   branching into two routing cards. Running/completed status badges and
   pulse-drawn connector lines (green when completed, grey when pending, with
   arrowheads) are driven by the JS loop below. Behaviour matches the reference:
   the loop runs each step in sequence and resets; on mobile the cards stack in
   a single column with straight rails and the SMB (second branch) card is
   hidden; prefers-reduced-motion shows everything completed with no loop.

   Layout + colours live in globals.css under `.wf-hero` (CSS variables, with a
   .dark override). Desktop cards are placed absolutely on a fixed 680×528
   canvas so the `.wf-overlay` SVG routing lines register exactly; below 1024px
   the same cards reflow into the vertical stack. Card titles/descriptions are
   prop-driven with the reference content as defaults. */

import { useEffect, useRef } from "react";

export type WorkflowCard = { title: string; desc: string };

const DEFAULTS = {
  trigger: { title: "When a new deal is created", desc: "Trigger when a new deal record is created." },
  triggerTag: "Trigger",
  webAgent: { title: "Web Agent", desc: "Enrich the record with web research." },
  customAgent: { title: "Custom Agent", desc: "Score the lead and route to the right AE." },
  branchLeft: { title: "Add to Enterprise target list", desc: "Route lead to Enterprise and draft outreach." },
  branchRight: { title: "Add to SMB target list", desc: "Route lead to SMB and draft outreach." },
} as const;

/* ── Shared bits ───────────────────────────────────────────────────────── */
function StatusBadges() {
  return (
    <>
      <div className="wf-status running">
        <svg className="wf-spin" width="12" height="12" fill="none" viewBox="0 0 12 12" aria-hidden>
          <circle cx="6" cy="6" r="4.5" stroke="var(--wf-run-spin-track)" />
          <path stroke="var(--wf-run-spin-head)" strokeLinecap="round" d="M6 10.5a4.5 4.5 0 0 0 0-9" />
        </svg>
        <span>Running</span>
      </div>
      <div className="wf-status completed">
        <svg width="12" height="12" fill="none" viewBox="0 0 12 12" aria-hidden>
          <path stroke="var(--wf-done-text)" strokeLinecap="round" strokeLinejoin="round" d="M3 5.7 3.7 7c.5.7.7 1 1 1.2h.8c.3-.1.5-.5 1-1.2L9 3" />
        </svg>
        <span>Completed</span>
      </div>
    </>
  );
}

/* Per-card node dot — used in the mobile stack (desktop draws nodes in the overlay). */
function Node() {
  return (
    <svg className="wf-node" width="12" height="12" fill="none" viewBox="0 0 12 12" aria-hidden>
      <circle className="ring-idle" cx="6" cy="6" r="4.8" fill="#fff" strokeWidth="1" />
      <circle className="ring-active" cx="6" cy="6" r="4.8" fill="#fff" strokeWidth="1" />
    </svg>
  );
}

/* Straight vertical rail + down chevron, between cards in the mobile stack. */
function Rail({ line }: { line: string }) {
  return (
    <div className="wf-conn wf-mobile-only" data-line={line}>
      <svg width="12" height="70" fill="none" viewBox="0 0 12 70">
        <path className="base" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m1 64 5 5 5-5M6 1v67" />
        <path className="active" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 1v67m-5-4 5 5 5-5" />
      </svg>
    </div>
  );
}

/* Icon glyphs (decorative, fixed per position — matches the reference chips). */
const TriggerIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden><path fillRule="evenodd" clipRule="evenodd" d="M4.15692 2.9802C3.86361 2.81399 3.5 3.02587 3.5 3.36301V8.63681C3.5 8.97395 3.86361 9.18584 4.15693 9.01962L8.81028 6.38272C9.10771 6.21418 9.10771 5.78565 8.81028 5.6171L4.15692 2.9802ZM2.5 3.36301C2.5 2.25964 3.68998 1.5662 4.64994 2.11018L9.30329 4.74708C10.2767 5.29868 10.2767 6.70114 9.30329 7.25274L4.64994 9.88964C3.68998 10.4336 2.5 9.74018 2.5 8.63681V3.36301Z" fill="currentColor" /></svg>
);
const Chip1Icon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden><path transform="translate(0.5 0.5)" d="M10.5 8C10.776 8.00013 11 8.22394 11 8.5V10H12.5C12.776 10.0001 13 10.2239 13 10.5C13 10.7761 12.776 10.9999 12.5 11H11V12.5C11 12.7761 10.776 12.9999 10.5 13C10.2239 13 10 12.7761 10 12.5V11H8.5C8.22386 11 8 10.7761 8 10.5C8 10.2239 8.22386 10 8.5 10H10V8.5C10 8.22386 10.2239 8 10.5 8ZM7.5 0C8.19178 0 8.74066 2.78937e-05 9.18262 0.0361328C9.63042 0.0727196 10.0127 0.149006 10.3623 0.327148C10.9265 0.614723 11.3853 1.07347 11.6729 1.6377C11.851 1.98732 11.9273 2.36958 11.9639 2.81738C12 3.25934 12 3.80822 12 4.5V6C12 6.27614 11.7761 6.5 11.5 6.5C11.2239 6.5 11 6.27614 11 6V4.5C11 3.79168 10.9998 3.29023 10.9678 2.89844C10.9362 2.51264 10.8765 2.27691 10.7822 2.0918C10.5905 1.71554 10.2845 1.40951 9.9082 1.21777C9.72309 1.12345 9.48736 1.06377 9.10156 1.03223C8.70977 1.00022 8.20832 1 7.5 1H4.5C3.79168 1 3.29023 1.00022 2.89844 1.03223C2.51264 1.06377 2.27691 1.12345 2.0918 1.21777C1.71554 1.40951 1.40951 1.71554 1.21777 2.0918C1.12345 2.27691 1.06377 2.51264 1.03223 2.89844C1.00022 3.29023 1 3.79168 1 4.5V7.5C1 8.20829 1.00022 8.70977 1.03223 9.10156C1.06377 9.48734 1.12346 9.7231 1.21777 9.9082C1.40951 10.2844 1.71555 10.5905 2.0918 10.7822C2.27691 10.8765 2.51265 10.9362 2.89844 10.9678C3.29023 10.9998 3.79171 11 4.5 11H6.5C6.77614 11 6.99999 11.2239 7 11.5C6.99993 11.7761 6.7761 12 6.5 12H4.5C3.80822 12 3.25933 12 2.81738 11.9639C2.36957 11.9273 1.98733 11.851 1.6377 11.6729C1.07348 11.3853 0.614728 10.9265 0.327148 10.3623C0.149002 10.0127 0.0727205 9.63043 0.0361328 9.18262C2.42128e-05 8.74067 0 8.19178 0 7.5V4.5C0 3.80822 2.78769e-05 3.25934 0.0361328 2.81738C0.0727196 2.36958 0.149006 1.98732 0.327148 1.6377C0.614723 1.07347 1.07347 0.614723 1.6377 0.327148C1.98732 0.149006 2.36958 0.0727196 2.81738 0.0361328C3.25934 2.78769e-05 3.80822 0 4.5 0H7.5ZM6.5 8.5C6.77614 8.5 7 8.72386 7 9C7 9.27614 6.77614 9.5 6.5 9.5H3C2.72386 9.5 2.5 9.27614 2.5 9C2.5 8.72386 2.72386 8.5 3 8.5H6.5ZM9 6.5C9.27614 6.5 9.5 6.72386 9.5 7C9.5 7.27614 9.27614 7.5 9 7.5H3C2.72386 7.5 2.5 7.27614 2.5 7C2.5 6.72386 2.72386 6.5 3 6.5H9ZM4.38574 2.50684C4.50016 2.51429 4.62583 2.53164 4.75391 2.58203C5.05792 2.70166 5.29834 2.94208 5.41797 3.24609C5.46836 3.37417 5.48571 3.49984 5.49316 3.61426C5.50032 3.7244 5.5 3.85617 5.5 4C5.5 4.14383 5.50032 4.2756 5.49316 4.38574C5.48571 4.50016 5.46836 4.62583 5.41797 4.75391C5.29834 5.05792 5.05792 5.29834 4.75391 5.41797C4.62583 5.46836 4.50016 5.48571 4.38574 5.49316C4.2756 5.50032 4.14383 5.5 4 5.5C3.85617 5.5 3.7244 5.50032 3.61426 5.49316C3.49984 5.48571 3.37417 5.46836 3.24609 5.41797C2.94208 5.29834 2.70166 5.05792 2.58203 4.75391C2.53164 4.62583 2.51429 4.50016 2.50684 4.38574C2.49968 4.2756 2.5 4.14383 2.5 4C2.5 3.85617 2.49968 3.7244 2.50684 3.61426C2.51429 3.49984 2.53164 3.37417 2.58203 3.24609C2.70166 2.94208 2.94208 2.70166 3.24609 2.58203C3.37417 2.53164 3.49984 2.51429 3.61426 2.50684C3.7244 2.49968 3.85617 2.5 4 2.5C4.14383 2.5 4.2756 2.49968 4.38574 2.50684ZM3.67871 3.50488C3.63798 3.50755 3.6189 3.51121 3.6123 3.5127C3.5666 3.53068 3.53068 3.5666 3.5127 3.6123C3.51121 3.6189 3.50755 3.63798 3.50488 3.67871C3.50031 3.74886 3.5 3.84299 3.5 4C3.5 4.15701 3.50031 4.25114 3.50488 4.32129C3.50755 4.36202 3.51121 4.3811 3.5127 4.3877C3.53068 4.4334 3.5666 4.46932 3.6123 4.4873C3.6189 4.48879 3.63798 4.49245 3.67871 4.49512C3.74886 4.49969 3.84299 4.5 4 4.5C4.15701 4.5 4.25114 4.49969 4.32129 4.49512C4.36202 4.49245 4.3811 4.48879 4.3877 4.4873C4.4334 4.46932 4.46932 4.4334 4.4873 4.3877C4.48879 4.3811 4.49245 4.36202 4.49512 4.32129C4.49969 4.25114 4.5 4.15701 4.5 4C4.5 3.84299 4.49969 3.74886 4.49512 3.67871C4.49245 3.63798 4.48879 3.6189 4.4873 3.6123C4.46932 3.5666 4.4334 3.53068 4.3877 3.5127C4.3811 3.51121 4.36202 3.50755 4.32129 3.50488C4.25114 3.50031 4.15701 3.5 4 3.5C3.84299 3.5 3.74886 3.50031 3.67871 3.50488Z" fill="currentColor" /></svg>
);
const Chip2Icon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden><path d="M10.3755 7.90283C11.7406 7.90306 12.8472 9.01028 12.8472 10.3755C12.8471 10.8607 12.7039 11.3111 12.4624 11.6929L13.6528 12.8843C13.8645 13.0966 13.8649 13.4407 13.6528 13.6528C13.4407 13.8649 13.0966 13.8645 12.8843 13.6528L11.6929 12.4624C11.3111 12.7039 10.8607 12.8471 10.3755 12.8472C9.01028 12.8472 7.90306 11.7406 7.90283 10.3755C7.90283 9.01014 9.01014 7.90283 10.3755 7.90283ZM9.89307 1.15283C11.5246 1.15298 12.8472 2.47638 12.8472 4.10791V6.51807C12.847 6.81798 12.6041 7.06171 12.3042 7.06201C12.0041 7.06201 11.7604 6.81817 11.7603 6.51807V4.10791C11.7603 3.07683 10.9241 2.24087 9.89307 2.24072H4.10791C3.07674 2.24072 2.24072 3.07674 2.24072 4.10791V9.89307C2.24087 10.9241 3.07683 11.7603 4.10791 11.7603H6.51807C6.81817 11.7604 7.06201 12.0041 7.06201 12.3042C7.06171 12.6041 6.81798 12.847 6.51807 12.8472H4.10791C2.47638 12.8472 1.15298 11.5246 1.15283 9.89307V4.10791C1.15283 2.47628 2.47628 1.15283 4.10791 1.15283H9.89307ZM10.3755 8.99072C9.6106 8.99072 8.99072 9.6106 8.99072 10.3755C8.99095 11.1402 9.61073 11.7603 10.3755 11.7603C11.14 11.76 11.76 11.14 11.7603 10.3755C11.7603 9.61073 11.1402 8.99095 10.3755 8.99072ZM6.51807 9.34912C6.8181 9.34935 7.06104 9.59298 7.06104 9.89307C7.06096 10.1931 6.81806 10.4368 6.51807 10.437H4.10693C3.80688 10.4369 3.56306 10.1931 3.56299 9.89307C3.56299 9.59293 3.80683 9.34927 4.10693 9.34912H6.51807ZM7.48193 7.42041C7.78216 7.42041 8.02588 7.66413 8.02588 7.96436C8.02588 8.26458 7.78216 8.5083 7.48193 8.5083H4.10693C3.80683 8.50815 3.56299 8.26449 3.56299 7.96436C3.56299 7.66422 3.80683 7.42056 4.10693 7.42041H7.48193ZM5.38232 3.56299C6.04283 3.56299 6.57922 4.09886 6.57959 4.75928V5.38232C6.57959 6.04305 6.04305 6.57959 5.38232 6.57959H4.75928C4.09886 6.57922 3.56299 6.04283 3.56299 5.38232V4.75928C3.56336 4.09909 4.09909 3.56336 4.75928 3.56299H5.38232ZM4.75928 4.65088C4.69955 4.65124 4.65124 4.69954 4.65088 4.75928V5.38232C4.65088 5.44237 4.69932 5.49133 4.75928 5.4917H5.38232C5.4426 5.4917 5.4917 5.4426 5.4917 5.38232V4.75928C5.49133 4.69932 5.44237 4.65088 5.38232 4.65088H4.75928Z" fill="currentColor" /></svg>
);
const Chip3Icon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden><path d="M9 0.5C9.27614 0.5 9.5 0.723858 9.5 1V2.00391C9.68802 2.00862 9.84402 2.01939 9.9873 2.04785C10.979 2.24512 11.7549 3.02097 11.9521 4.0127C11.9806 4.15598 11.9914 4.31198 11.9961 4.5H13C13.2761 4.5 13.5 4.72386 13.5 5C13.5 5.27614 13.2761 5.5 13 5.5H12V6.5H13C13.2761 6.5 13.5 6.72386 13.5 7C13.5 7.27614 13.2761 7.5 13 7.5H12V8.5H13C13.2761 8.5 13.5 8.72386 13.5 9C13.5 9.27614 13.2761 9.5 13 9.5H11.9961C11.9914 9.68802 11.9806 9.84402 11.9521 9.9873C11.7549 10.979 10.979 11.7549 9.9873 11.9521C9.84403 11.9806 9.68801 11.9904 9.5 11.9951V13C9.5 13.2761 9.27614 13.5 9 13.5C8.72386 13.5 8.5 13.2761 8.5 13V12H7.5V13C7.5 13.2761 7.27614 13.5 7 13.5C6.72386 13.5 6.5 13.2761 6.5 13V12H5.5V13C5.5 13.2761 5.27614 13.5 5 13.5C4.72386 13.5 4.5 13.2761 4.5 13V11.9951C4.31199 11.9904 4.15597 11.9806 4.0127 11.9521C3.02097 11.7549 2.24512 10.979 2.04785 9.9873C2.01939 9.84402 2.00862 9.68802 2.00391 9.5H1C0.723858 9.5 0.5 9.27614 0.5 9C0.5 8.72386 0.723858 8.5 1 8.5H2V7.5H1C0.723858 7.5 0.5 7.27614 0.5 7C0.5 6.72386 0.723858 6.5 1 6.5H2V5.5H1C0.723858 5.5 0.5 5.27614 0.5 5C0.5 4.72386 0.723858 4.5 1 4.5H2.00391C2.00862 4.31198 2.01939 4.15598 2.04785 4.0127C2.24512 3.02097 3.02097 2.24512 4.0127 2.04785C4.15598 2.01939 4.31198 2.00862 4.5 2.00391V1C4.5 0.723858 4.72386 0.5 5 0.5C5.27614 0.5 5.5 0.723858 5.5 1V2H6.5V1C6.5 0.723858 6.72386 0.5 7 0.5C7.27614 0.5 7.5 0.723858 7.5 1V2H8.5V1C8.5 0.723858 8.72386 0.5 9 0.5ZM5 3C4.51138 3 4.33975 3.0029 4.20703 3.0293C3.61233 3.14776 3.14776 3.61233 3.0293 4.20703C3.0029 4.33975 3 4.51138 3 5V9C3 9.48862 3.0029 9.66024 3.0293 9.79297C3.14776 10.3877 3.61233 10.8522 4.20703 10.9707C4.33975 10.9971 4.51138 11 5 11H9C9.48862 11 9.66024 10.9971 9.79297 10.9707C10.3877 10.8522 10.8522 10.3877 10.9707 9.79297C10.9971 9.66024 11 9.48862 11 9V5C11 4.51138 10.9971 4.33975 10.9707 4.20703C10.8522 3.61233 10.3877 3.14776 9.79297 3.0293C9.66024 3.0029 9.48862 3 9 3H5ZM7.00098 4C7.19844 4.00038 7.37706 4.11727 7.45703 4.29785L9.00586 7.79492L9.45605 8.79492L9.48828 8.89062C9.53937 9.11759 9.42548 9.35687 9.20508 9.45605C8.95328 9.56928 8.65725 9.45686 8.54395 9.20508L8.22656 8.5H5.7666L5.45801 9.20117C5.34684 9.45383 5.05152 9.569 4.79883 9.45801C4.54617 9.34684 4.431 9.05152 4.54199 8.79883L4.98242 7.79883L4.9834 7.79688L6.54297 4.29688C6.62342 4.11637 6.80336 3.99976 7.00098 4ZM6.20996 7.5H7.78223L6.99805 5.73047L6.20996 7.5Z" fill="currentColor" /></svg>
);
const Chip4Icon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden><path d="M11.4998 9C11.7759 9 11.9998 9.22386 11.9998 9.5V11H13.4998C13.7759 11 13.9998 11.2239 13.9998 11.5C13.9998 11.7761 13.7759 12 13.4998 12H11.9998V13.5C11.9998 13.7761 11.7759 14 11.4998 14C11.2236 14 10.9998 13.7761 10.9998 13.5V12H9.49976C9.22361 12 8.99976 11.7761 8.99976 11.5C8.99976 11.2239 9.22361 11 9.49976 11H10.9998V9.5C10.9998 9.22386 11.2236 9 11.4998 9ZM8.94507 0C10.2247 0.000239291 11.2803 0.942151 11.4666 2.16992C11.6038 2.21074 11.735 2.26242 11.8621 2.32715C12.4263 2.61472 12.885 3.07347 13.1726 3.6377C13.3507 3.98732 13.427 4.36958 13.4636 4.81738C13.4997 5.25934 13.4998 5.80822 13.4998 6.5V7.75C13.4998 8.02614 13.2759 8.25 12.9998 8.25C12.7236 8.25 12.4998 8.02614 12.4998 7.75V6.5C12.4998 5.79168 12.4995 5.29023 12.4675 4.89844C12.436 4.51264 12.3763 4.27691 12.282 4.0918C12.0902 3.71554 11.7842 3.40951 11.408 3.21777C11.2228 3.12345 10.9871 3.06377 10.6013 3.03223C10.2095 3.00022 9.70807 3 8.99976 3H6.49976C5.79144 3 5.28999 3.00022 4.89819 3.03223C4.51239 3.06377 4.27667 3.12345 4.09155 3.21777C3.7153 3.40951 3.40926 3.71554 3.21753 4.0918C3.12321 4.27691 3.06352 4.51264 3.03198 4.89844C2.99997 5.29023 2.99976 5.79168 2.99976 6.5V9C2.99976 9.70832 2.99997 10.2098 3.03198 10.6016C3.06352 10.9874 3.12321 11.2231 3.21753 11.4082C3.40926 11.7845 3.7153 12.0905 4.09155 12.2822C4.27667 12.3765 4.51239 12.4362 4.89819 12.4678C5.28999 12.4998 5.79144 12.5 6.49976 12.5H7.49976C7.7759 12.5 7.99976 12.7239 7.99976 13C7.99976 13.2761 7.7759 13.5 7.49976 13.5H6.49976C5.80797 13.5 5.25909 13.5 4.81714 13.4639C4.36934 13.4273 3.98707 13.351 3.63745 13.1729C3.07323 12.8853 2.61448 12.4265 2.3269 11.8623C2.26357 11.738 2.21299 11.6096 2.17261 11.4756C0.946685 11.3152 -0.000244141 10.2697 -0.000244141 9V4.5C-0.000244141 3.80822 -0.00021626 3.25934 0.0358887 2.81738C0.0724754 2.36958 0.148762 1.98732 0.326904 1.6377C0.614479 1.07347 1.07323 0.614723 1.63745 0.327148C1.98707 0.149006 2.36934 0.0727196 2.81714 0.0361328C3.25909 2.78783e-05 3.80797 0 4.49976 0H8.94507ZM7.49976 10.5C7.7759 10.5 7.99976 10.7239 7.99976 11C7.99976 11.2761 7.7759 11.5 7.49976 11.5H4.99976C4.72361 11.5 4.49976 11.2761 4.49976 11C4.49976 10.7239 4.72361 10.5 4.99976 10.5H7.49976ZM4.49976 1C3.79144 1 3.28999 1.00022 2.89819 1.03223C2.51239 1.06377 2.27667 1.12345 2.09155 1.21777C1.7153 1.40951 1.40926 1.71554 1.21753 2.0918C1.12321 2.27691 1.06352 2.51264 1.03198 2.89844C0.999971 3.29023 0.999756 3.79168 0.999756 4.5V9C0.999756 9.66054 1.42726 10.2197 2.02026 10.4199C2.00101 10.0277 1.99976 9.56087 1.99976 9V6.5C1.99976 5.80822 1.99978 5.25934 2.03589 4.81738C2.07248 4.36958 2.14876 3.98732 2.3269 3.6377C2.61448 3.07347 3.07323 2.61472 3.63745 2.32715C3.98707 2.14901 4.36934 2.07272 4.81714 2.03613C5.25909 2.00003 5.80797 2 6.49976 2H8.99976C9.55227 2 10.0136 2.00113 10.4021 2.01953C10.1835 1.42525 9.61503 1.00021 8.94507 1H4.49976ZM8.99976 8.5C9.2759 8.5 9.49976 8.72386 9.49976 9C9.49976 9.27614 9.2759 9.5 8.99976 9.5H4.99976C4.72361 9.5 4.49976 9.27614 4.49976 9C4.49976 8.72386 4.72361 8.5 4.99976 8.5H8.99976ZM6.41187 4.50781C6.53425 4.51657 6.669 4.53722 6.80542 4.59668C7.07278 4.71333 7.28643 4.92698 7.40308 5.19434C7.46254 5.33075 7.48319 5.46551 7.49194 5.58789C7.50036 5.70564 7.49976 5.84695 7.49976 6C7.49976 6.15305 7.50036 6.29436 7.49194 6.41211C7.48319 6.53449 7.46254 6.66925 7.40308 6.80566C7.28643 7.07302 7.07278 7.28667 6.80542 7.40332C6.669 7.46278 6.53425 7.48343 6.41187 7.49219C6.29411 7.5006 6.15281 7.5 5.99976 7.5C5.8467 7.5 5.7054 7.5006 5.58765 7.49219C5.46527 7.48343 5.33051 7.46278 5.19409 7.40332C4.92673 7.28667 4.71308 7.07302 4.59644 6.80566C4.53698 6.66925 4.51633 6.53449 4.50757 6.41211C4.49916 6.29436 4.49976 6.15305 4.49976 6C4.49976 5.84695 4.49916 5.70564 4.50757 5.58789C4.51633 5.46551 4.53698 5.33075 4.59644 5.19434C4.71308 4.92698 4.92673 4.71333 5.19409 4.59668C5.33051 4.53722 5.46527 4.51657 5.58765 4.50781C5.7054 4.4994 5.8467 4.5 5.99976 4.5C6.15281 4.5 6.29411 4.4994 6.41187 4.50781Z" fill="currentColor" /></svg>
);

function Card({
  step,
  chip,
  icon,
  card,
  tag,
  smb = false,
}: {
  step: number;
  chip: "c1" | "c2" | "c3" | "c4";
  icon: React.ReactNode;
  card: WorkflowCard;
  tag?: string;
  smb?: boolean;
}) {
  return (
    <div className={"wf-card" + (smb ? " wf-smb" : "")} data-step={step}>
      {tag && (
        <div className="wf-tag">
          <TriggerIcon />
          <span>{tag}</span>
        </div>
      )}
      <StatusBadges />
      <div className="wf-card-inner">
        <div className="wf-card-head">
          <div className={"wf-chip " + chip}>{icon}</div>
          <span className="wf-card-title">{card.title}</span>
        </div>
        <p className="wf-card-desc">{card.desc}</p>
      </div>
      <Node />
    </div>
  );
}

/* One overlay connector group: grey base path + green pulse-drawn active path
   (arrowheads baked into the `d`), plus the source node dot (blue → green). */
function OverlayLine({ line, d, node }: { line: string; d: string; node: [number, number] }) {
  return (
    <g className="wf-line" data-line={line}>
      <path className="base" strokeLinecap="round" strokeLinejoin="round" d={d} />
      <path className="active" pathLength={1} strokeLinecap="round" strokeLinejoin="round" d={d} />
      <circle className="onode onode-idle" cx={node[0]} cy={node[1]} r="4.8" />
      <circle className="onode onode-active" cx={node[0]} cy={node[1]} r="4.8" />
    </g>
  );
}

export function WorkflowHero({
  trigger = DEFAULTS.trigger,
  triggerTag = DEFAULTS.triggerTag,
  webAgent = DEFAULTS.webAgent,
  customAgent = DEFAULTS.customAgent,
  branchLeft = DEFAULTS.branchLeft,
  branchRight = DEFAULTS.branchRight,
  className = "",
}: {
  trigger?: WorkflowCard;
  triggerTag?: string;
  webAgent?: WorkflowCard;
  customAgent?: WorkflowCard;
  branchLeft?: WorkflowCard;
  branchRight?: WorkflowCard;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Animation loop — faithful port of the reference script, scoped to this
  // instance (so multiple heroes on a page loop independently). Drives both the
  // desktop overlay lines and the mobile rails (matched by data-line), and the
  // cards' running/done state (matched by data-step).
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const RUN_TIME = 1400;
    const LINE_TIME = 900;
    const RESET_PAUSE = 2200;

    const steps = [0, 1, 2, 3].map((i) => root.querySelectorAll<HTMLElement>(`[data-step="${i}"]`));
    const lines = [
      root.querySelectorAll<HTMLElement>('[data-line="0"]'),
      root.querySelectorAll<HTMLElement>('[data-line="1"]'),
      root.querySelectorAll<HTMLElement>('[data-line="2"], [data-line="2m"]'),
    ];

    const setState = (nodes: NodeListOf<HTMLElement>, cls: string, on: boolean) =>
      nodes.forEach((n) => n.classList.toggle(cls, on));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      steps.forEach((s) => setState(s, "is-done", true));
      lines.forEach((l) => setState(l, "is-active", true));
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) =>
      new Promise<void>((r) => {
        timers.push(setTimeout(r, ms));
      });

    async function runCycle() {
      if (cancelled) return;
      for (let i = 0; i < steps.length; i++) {
        if (cancelled) return;
        setState(steps[i], "is-running", true);
        await wait(RUN_TIME);
        if (cancelled) return;
        setState(steps[i], "is-running", false);
        setState(steps[i], "is-done", true);
        if (i < lines.length) {
          setState(lines[i], "is-active", true);
          await wait(LINE_TIME);
        }
      }
      if (cancelled) return;
      await wait(RESET_PAUSE);
      if (cancelled) return;
      steps.forEach((s) => {
        setState(s, "is-running", false);
        setState(s, "is-done", false);
      });
      lines.forEach((l) =>
        l.forEach((el) => {
          el.classList.remove("is-active");
          el.querySelectorAll<SVGElement>(".active").forEach((p) => (p.style.transition = "none"));
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              el.querySelectorAll<SVGElement>(".active").forEach((p) => (p.style.transition = ""));
            })
          );
        })
      );
      await wait(400);
      runCycle();
    }

    runCycle();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className={"wf-fit" + (className ? " " + className : "")}>
    <div ref={rootRef} className="wf-hero">
      {/* Desktop connector overlay (hidden < 1100px). viewBox matches the fixed
          980×410 desktop canvas: three cards across the top, two below. */}
      <div className="wf-overlay" aria-hidden>
        <svg viewBox="0 0 980 300" fill="none" preserveAspectRatio="none">
          {/* Trigger → Web Agent (horizontal, arrow right — at the cards' vertical centre) */}
          <OverlayLine line="0" node={[300, 33]} d="M300 33 H340 M332 28 L340 33 L332 38" />
          {/* Web Agent → Custom Agent (horizontal, arrow right) */}
          <OverlayLine line="1" node={[640, 33]} d="M640 33 H680 M672 28 L680 33 L672 38" />
          {/* Custom Agent → both branch cards (down from its bottom, bus left, split, arrows into card tops) */}
          <OverlayLine
            line="2"
            node={[830, 66]}
            d="M830 66 V115 Q830 130 815 130 H315 Q300 130 300 145 V200 M293 193 L300 200 L307 193 M680 130 V200 M673 193 L680 200 L687 193"
          />
          {/* Terminal node dots at the branch-card bottoms (idle) */}
          <circle className="onode onode-idle" cx="300" cy="266" r="4.8" />
          <circle className="onode onode-idle" cx="680" cy="266" r="4.8" />
        </svg>
      </div>

      <Card step={0} chip="c1" icon={<Chip1Icon />} card={trigger} tag={triggerTag} />
      <Rail line="0" />
      <Card step={1} chip="c2" icon={<Chip2Icon />} card={webAgent} />
      <Rail line="1" />
      <Card step={2} chip="c3" icon={<Chip3Icon />} card={customAgent} />
      <Rail line="2m" />
      <Card step={3} chip="c4" icon={<Chip4Icon />} card={branchLeft} />
      <Card step={3} chip="c4" icon={<Chip4Icon />} card={branchRight} smb />
    </div>
    </div>
  );
}

export default WorkflowHero;
