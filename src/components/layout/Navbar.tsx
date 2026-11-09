"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { contact } from "@/data/socials";
import { cn, pad2 } from "@/lib/utils";
import { getLenis } from "@/lib/animations/lenis-store";
import { Arrow } from "@/components/ui/Arrow";

/**
 * Minimal fixed navigation (Apple / FoundFirst restraint).
 * - Adapts colour automatically over sections marked data-theme="dark".
 * - Gains a translucent backing once the page has scrolled.
 * - Mobile: full-screen charcoal overlay with staggered type.
 * - Keyboard: Esc closes, focus is trapped while open and restored after.
 */
export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      setScrolled(window.scrollY > 24);
      const h = headerRef.current;
      if (!h) return;
      const y = h.offsetHeight / 2;
      const stack = document.elementsFromPoint(window.innerWidth / 2, y);
      const under = stack.find((el) => !h.contains(el));
      setOnDark(Boolean(under?.closest('[data-theme="dark"]')));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const f = [...panelRef.current.querySelectorAll<HTMLElement>("a,button"), ...(toggleRef.current ? [toggleRef.current] : [])];
        const i = f.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          f[f.length - 1]?.focus();
        } else if (!e.shiftKey && i === f.length - 1) {
          e.preventDefault();
          f[0]?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const light = open || onDark; // light text

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={reduce ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: isHome ? 1.5 : 0.2 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,color,backdrop-filter] duration-500",
          light ? "text-paper" : "text-ink",
          scrolled && !open && (onDark ? "bg-ink/55 backdrop-blur-xl" : "bg-paper/72 backdrop-blur-xl")
        )}
      >
        <nav aria-label="Primary" className="shell flex h-16 items-center justify-between gap-6">
          <Link
            href={isHome ? "#top" : "/"}
            onClick={() => setOpen(false)}
            className="relative z-10 flex items-center gap-1.5 text-[0.9375rem] font-semibold tracking-[-0.02em]"
            aria-label={`${profile.fullName}, home`}
          >
            Carter Florence<span aria-hidden className="h-1.5 w-1.5 translate-y-1 rounded-full bg-blush" />
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-line py-1 text-[0.8125rem] font-medium opacity-80 transition-opacity hover:opacity-100">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            <a
              href={isHome ? "#contact-form" : "/#contact-form"}
              className="group hidden items-center gap-1.5 text-[0.8125rem] font-semibold sm:inline-flex"
            >
              <span className="link-line">Get in touch</span>
              <Arrow />
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative z-10 flex h-11 items-center gap-3 lg:hidden"
            >
              <span className="eyebrow">{open ? "Close" : "Menu"}</span>
              <span aria-hidden className="relative block h-2.5 w-6">
                <span className={cn("absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-[var(--ease-out)]", open ? "top-1/2 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-[var(--ease-out)]", open ? "top-1/2 -rotate-45" : "top-full")} />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.75, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-ink pt-24 text-paper lg:hidden"
          >
            <ul className="shell flex flex-1 flex-col justify-center">
              {navigation.map((item, i) => (
                <li key={item.href} className="overflow-hidden border-b border-paper/10">
                  <motion.div
                    initial={reduce ? false : { y: "100%" }}
                    animate={{ y: 0 }}
                    exit={reduce ? undefined : { y: "100%", transition: { duration: 0.3, delay: 0 } }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.06 }}
                  >
                    <Link href={item.href} onClick={() => setOpen(false)} className="flex items-baseline justify-between py-3">
                      <span className="t-head text-[clamp(2.75rem,12vw,4.5rem)] tracking-[-0.02em]">{item.label}</span>
                      <span className="eyebrow text-grey">{pad2(i + 1)}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="shell flex flex-wrap items-center gap-x-8 gap-y-2 py-8 text-sm"
            >
              <a href={isHome ? "#contact-form" : "/#contact-form"} onClick={() => setOpen(false)} className="group flex min-h-11 items-center gap-2">
                Get in touch <Arrow />
              </a>
              {contact.linkedin && (
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="group flex min-h-11 items-center gap-2">
                  LinkedIn <Arrow />
                </a>
              )}
              <span className="eyebrow ml-auto text-grey">{profile.location}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
