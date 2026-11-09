"use client";

import { scrollToTarget } from "@/lib/animations/lenis-store";
import { Magnetic } from "@/components/animations/Magnetic";
import { Arrow } from "@/components/ui/Arrow";

/** Jumps to the contact form with "Public speaking" pre-selected. */
export function SpeakButton() {
  return (
    <Magnetic>
      <button
        type="button"
        onClick={() => {
          window.dispatchEvent(new CustomEvent("contact-topic", { detail: "Public speaking" }));
          scrollToTarget("#contact-form", -100);
        }}
        className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-ink py-2 pl-5 pr-2 text-[0.9375rem] font-medium text-paper"
      >
        Invite me to speak
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-paper/15">
          <Arrow />
        </span>
      </button>
    </Magnetic>
  );
}
