"use client";

import { useTransition } from "react";
import { setCspMode } from "@/app/actions";
import type { CspMode } from "@/lib/csp";

const MODES: { value: CspMode; label: string; hint: string }[] = [
  { value: "off", label: "Off", hint: "No CSP header sent. Everything runs." },
  {
    value: "report",
    label: "Report-Only",
    hint: "Violations reported in console, not blocked.",
  },
  {
    value: "enforce",
    label: "Enforced",
    hint: "Violations blocked by the browser.",
  },
];

export function CspToggle({ current }: { current: CspMode }) {
  const [isPending, startTransition] = useTransition();

  function choose(mode: CspMode) {
    startTransition(async () => {
      await setCspMode(mode);
      // Full reload so the NEXT request hits middleware with the new cookie,
      // and the browser receives the new CSP header before rendering.
      window.location.reload();
    });
  }

  return (
    <div className="csp-toggle">
      <strong>CSP mode</strong>
      {MODES.map((m) => (
        <button
          key={m.value}
          onClick={() => choose(m.value)}
          disabled={isPending}
          aria-pressed={current === m.value}
          title={m.hint}
          style={{
            fontWeight: current === m.value ? 700 : 400,
            textDecoration: current === m.value ? "underline" : "none",
          }}
        >
          {m.label}
        </button>
      ))}
      <span className="csp-current">(current: {current})</span>
    </div>
  );
}
