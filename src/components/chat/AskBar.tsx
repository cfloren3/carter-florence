"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUp, X } from "lucide-react";
import { scrollToTarget } from "@/lib/animations/lenis-store";
import { cn } from "@/lib/utils";

interface Q {
  id: string;
  question: string;
  /** Topic shown beside the question and used for matching, e.g. "Yardex". */
  context?: string;
  /** Extra searchable text (the answer), not displayed. */
  keywords?: string;
}

const STOP = new Set(["what", "did", "you", "do", "the", "a", "an", "is", "are", "how", "and", "of", "to", "at", "your", "was", "it", "in", "on", "so"]);
const words = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9$ ]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w));

/**
 * The "Ask" bar — a chat-style input pinned to the bottom of the screen.
 * It is NOT an AI: typing filters the scripted questions on the page, and
 * choosing one scrolls to it so the answer plays. Unmatched queries get an
 * honest "no written answer yet" with a pointer to contact.
 * Combobox semantics: ↑/↓ to move, Enter to choose, Esc to close.
 */
export function AskBar({ questions, contactHref }: { questions: Q[]; contactHref: string }) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [hint, setHint] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const listId = useId();
  const reduce = useReducedMotion();

  // Appear once the visitor has scrolled past the opening.
  useEffect(() => {
    const onScroll = () => {
      const intro = document.getElementById("about");
      setVisible(intro ? intro.getBoundingClientRect().top < window.innerHeight * 0.55 : window.scrollY > window.innerHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Rotating placeholder, like a chat app suggesting prompts.
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setHint((h) => (h + 1) % questions.length), 3200);
    return () => clearInterval(t);
  }, [reduce, questions.length]);

  // Close when clicking outside.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [open]);

  const results = useMemo(() => {
    const qw = words(query);
    if (!qw.length) return questions;
    return questions
      .map((q) => {
        const head = words(`${q.question} ${q.context ?? ""}`);
        const body = words(q.keywords ?? "");
        const hit = (list: string[], x: string) => list.some((y) => y.startsWith(x) || x.startsWith(y));
        // matches in the question/topic count more than matches in the answer
        const score = qw.reduce((s, x) => s + (hit(head, x) ? 2 : hit(body, x) ? 1 : 0), 0);
        return { q, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.q);
  }, [query, questions]);

  const choose = (q: Q) => {
    setOpen(false);
    setQuery("");
    input.current?.blur();
    scrollToTarget(`#q-${q.id}`, -window.innerHeight * 0.18);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[active]) choose(results[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
      input.current?.blur();
    }
  };

  return (
    <div
      ref={wrap}
      className={cn(
        "fixed inset-x-0 bottom-4 z-40 mx-auto w-[min(36rem,calc(100%-2rem))] transition-[opacity,transform] duration-700 ease-[var(--ease-out)] md:bottom-6",
        visible || open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      )}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mb-2 overflow-hidden rounded-2xl border border-ink/10 bg-paper/95 shadow-[0_24px_60px_-20px_rgba(32,35,33,.35)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between px-4 pb-2 pt-3">
              <p className="eyebrow text-mute">{query ? "Closest questions" : "Questions people ask"}</p>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close suggestions" className="flex h-8 w-8 items-center justify-center text-mute hover:text-ink">
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
            {results.length ? (
              <ul id={listId} role="listbox" aria-label="Questions" className="max-h-[46svh] overflow-y-auto overscroll-contain px-2 pb-2" data-lenis-prevent>
                {results.map((q, i) => (
                  <li
                    key={q.id}
                    id={`${listId}-${i}`}
                    role="option"
                    aria-selected={i === active}
                    onPointerEnter={() => setActive(i)}
                    onClick={() => choose(q)}
                    className={cn(
                      "flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 text-[0.9375rem] transition-colors",
                      i === active ? "bg-ink text-paper" : "text-ink"
                    )}
                  >
                    <span>
                      {q.context && <span className="eyebrow mr-2 opacity-60">{q.context} ·</span>}
                      {q.question}
                    </span>
                    <span aria-hidden className="text-xs opacity-60">↵</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-4 pb-4 text-[0.9375rem] leading-relaxed text-ink/80">
                There’s no written answer for that yet. Try one of the suggestions, or{" "}
                <a href={contactHref} className="font-semibold underline underline-offset-2" onClick={() => setOpen(false)}>
                  ask Carter directly
                </a>
                .
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center gap-2 rounded-2xl border border-ink/10 bg-paper/90 p-1.5 pl-4 shadow-[0_18px_50px_-18px_rgba(32,35,33,.4)] backdrop-blur-xl"
      >
        <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-blush" />
        <label htmlFor="ask-input" className="sr-only">
          Ask about Carter
        </label>
        <input
          id="ask-input"
          ref={input}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && results[active] ? `${listId}-${active}` : undefined}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          autoComplete="off"
          placeholder={questions.length ? `Ask: “${questions[hint % questions.length].question}”` : "Ask about Carter"}
          className="min-w-0 flex-1 bg-transparent py-2 text-[0.9375rem] text-ink outline-none placeholder:text-mute"
        />
        <button
          type="button"
          onClick={() => (results[active] ? choose(results[active]) : setOpen(true))}
          aria-label="Go to answer"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink text-paper transition-transform hover:-translate-y-0.5"
        >
          <ArrowUp className="h-4 w-4" aria-hidden />
        </button>
      </form>
    </div>
  );
}
