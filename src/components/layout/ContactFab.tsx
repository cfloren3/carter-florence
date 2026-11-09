"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Floating "Let's talk" button. Appears once you're past the hero, hides
 * while the contact section is on screen, and jumps to the form.
 */
export function ContactFab() {
  const [past, setPast] = useState(false);
  const [atContact, setAtContact] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const el = document.getElementById("contact");
    const io = el ? new IntersectionObserver(([e]) => setAtContact(e.isIntersecting), { threshold: 0.05 }) : null;
    if (el && io) io.observe(el);
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  const show = past && !atContact;
  return (
    <a
      href="#contact-form"
      aria-label="Contact Carter"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={cn(
        "group fixed right-4 z-40 flex items-center gap-2.5 rounded-full bg-ink py-3 pl-3 pr-3 text-paper shadow-[0_18px_40px_-12px_rgba(32,35,33,0.55)] ring-1 ring-paper/10 transition-[opacity,transform,padding] duration-500 ease-[var(--ease-out)] hover:-translate-y-0.5 md:right-6 md:pr-5",
        "bottom-[5.25rem] lg:bottom-6",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-paper text-ink">
        <MessageCircle className="h-4 w-4" aria-hidden />
        <span aria-hidden className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-blush ring-2 ring-ink motion-safe:animate-pulse" />
      </span>
      <span className="hidden text-[0.875rem] font-semibold md:inline">Let’s talk</span>
    </a>
  );
}
