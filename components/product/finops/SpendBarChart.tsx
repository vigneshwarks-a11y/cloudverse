"use client";

/* Spend / overview bar chart for Panel A of the FinOps variance mock.
   Built on the shadcn chart wrapper (ChartContainer + recharts) so it carries
   the theme-aware chart CSS vars — the last bar is amber (attention/variance),
   the rest are inert ink. Static (no hover tooltip). Client-only (recharts). */

import { Bar, BarChart, Cell } from "recharts";

import {
  ChartContainer,
  type ChartConfig,
} from "@/components/ui/chart";

const AMBER = "#D97706";

const data = [
  { day: "Mon", spend: 96_800 },
  { day: "Tue", spend: 102_400 },
  { day: "Wed", spend: 99_100 },
  { day: "Thu", spend: 112_600 },
  { day: "Fri", spend: 109_900 },
  { day: "Sat", spend: 118_300 },
  { day: "Sun", spend: 128_400 },
];

const config = {
  spend: { label: "Spend" },
} satisfies ChartConfig;

export function SpendBarChart() {
  const last = data.length - 1;
  return (
    <ChartContainer config={config} className="mt-5 min-h-[120px] w-full flex-1 aspect-auto">
      <BarChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }} barCategoryGap={6}>
        <Bar dataKey="spend" radius={2} isAnimationActive={false}>
          {data.map((_, i) => (
            <Cell
              key={i}
              fill={i === last ? AMBER : "hsl(var(--cv-ink) / 0.12)"}
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
