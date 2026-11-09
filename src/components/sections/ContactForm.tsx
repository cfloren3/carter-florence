"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Arrow } from "@/components/ui/Arrow";
import { Magnetic } from "@/components/animations/Magnetic";
import { cn } from "@/lib/utils";

const TOPICS = ["Coffee chat", "Internship / workplace inquiry", "Public speaking"] as const;

type Status = "idle" | "sending" | "sent" | "fallback" | "error";
interface Payload {
  name: string;
  email: string;
  organization: string;
  topic: string;
  message: string;
}

/**
 * Where a message goes, in order:
 *  1. NEXT_PUBLIC_CONTACT_ENDPOINT (e.g. a Formspree form URL) — the live site.
 *  2. The hosted preview's private database (claude.ai artifact `db`), when
 *     this viewer may write: stored at messages/<viewer>/sent, readable only
 *     by Carter and editors.
 *  3. Otherwise: a pre-filled email, plus a copy button.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

type ClaudeRuntime = { use: (name: string) => Promise<unknown> };
type DbLike = { collection: (p: string) => { add: (d: Record<string, unknown>) => Promise<unknown> } };
type UserLike = { id: () => Promise<string | null>; can?: (n: string) => Promise<boolean | null> | boolean | null };

const withTimeout = <T,>(p: Promise<T>, ms: number) =>
  Promise.race([p, new Promise<null>((r) => setTimeout(() => r(null), ms))]);

async function deliver(data: Payload): Promise<"sent" | "fallback"> {
  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return "sent";
  }
  const runtime = (window as unknown as { claude?: ClaudeRuntime }).claude;
  if (runtime?.use) {
    const [db, user] = (await Promise.all([withTimeout(runtime.use("db"), 6000), withTimeout(runtime.use("user"), 6000)])) as [
      DbLike | null,
      UserLike | null,
    ];
    if (db && user) {
      const id = await user.id();
      const canWrite = await Promise.resolve(user.can?.("data.write") ?? null);
      if (id && canWrite !== false) {
        try {
          await db.collection(`messages/${id}/sent`).add({ ...data, sentAt: new Date().toISOString() });
          return "sent";
        } catch {
          /* not allowed for this viewer — fall through to email */
        }
      }
    }
  }
  return "fallback";
}

export function ContactForm({ email }: { email: string | null }) {
  const reduce = useReducedMotion();
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [topic, setTopic] = useState<string>(TOPICS[0]);
  const [errors, setErrors] = useState<Partial<Record<keyof Payload, string>>>({});
  const [last, setLast] = useState<Payload | null>(null);
  const [copied, setCopied] = useState(false);

  // Other sections (e.g. "Invite me to speak") can pre-select a topic.
  useEffect(() => {
    const onTopic = (e: Event) => {
      const t = (e as CustomEvent<string>).detail;
      if ((TOPICS as readonly string[]).includes(t)) {
        setTopic(t);
        setStatus("idle");
      }
    };
    window.addEventListener("contact-topic", onTopic);
    return () => window.removeEventListener("contact-topic", onTopic);
  }, []);

  const mailto = (d: Payload) =>
    `mailto:${email ?? ""}?subject=${encodeURIComponent(`${d.topic}: ${d.name}${d.organization ? `, ${d.organization}` : ""}`)}&body=${encodeURIComponent(
      `${d.message}\n\n${d.name}\n${d.email}${d.organization ? `\n${d.organization}` : ""}`
    )}`;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("website")) return; // honeypot: bots fill hidden fields
    const data: Payload = {
      name: String(f.get("name") ?? "").trim(),
      email: String(f.get("email") ?? "").trim(),
      organization: String(f.get("organization") ?? "").trim(),
      topic,
      message: String(f.get("message") ?? "").trim(),
    };
    const errs: typeof errors = {};
    if (!data.name) errs.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = "Please add an email address I can reply to.";
    if (data.message.length < 10) errs.message = "A sentence or two is plenty.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`${uid}-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setLast(data);
    setStatus("sending");
    try {
      setStatus(await deliver(data));
    } catch {
      setStatus("error");
    }
  };

  const field =
    "w-full border-0 border-b border-paper/25 bg-transparent px-0 py-3 text-[1.125rem] text-paper placeholder:text-paper/35 transition-colors focus:border-paper focus:outline-none focus:ring-0";
  const label = "eyebrow text-grey";

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" ? (
          <motion.div
            key="sent"
            role="status"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 py-6"
          >
            <p className="ml-auto max-w-[85%] rounded-[1.4rem] rounded-br-md bg-paper px-5 py-3.5 text-[1.0625rem] font-medium text-ink">
              {last?.message.slice(0, 140)}
              {(last?.message.length ?? 0) > 140 ? "…" : ""}
            </p>
            <div className="flex gap-4">
              <span aria-hidden className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blush text-[0.6875rem] font-semibold text-ink">
                CF
              </span>
              <div>
                <p className="eyebrow text-grey">Carter</p>
                <p className="mt-2 text-[clamp(1.25rem,1.8vw,1.6rem)] font-medium leading-snug">
                  Thanks, {last?.name.split(" ")[0]}. Your message is with me. I’ll reply to {last?.email}.
                </p>
              </div>
            </div>
            <button type="button" onClick={() => setStatus("idle")} className="eyebrow link-line self-start text-grey">
              Send another
            </button>
          </motion.div>
        ) : status === "fallback" && last ? (
          <motion.div
            key="fallback"
            role="status"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5 py-6"
          >
            <p className="text-[clamp(1.25rem,1.8vw,1.6rem)] font-medium leading-snug">Your message is ready. Send it by email to finish.</p>
            <p className="text-paper/70">
              It goes to <span className="select-all text-paper">{email}</span>.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={mailto(last)} className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-paper py-2 pl-5 pr-2 text-[0.9375rem] font-medium text-ink">
                Open email
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/10">
                  <Arrow />
                </span>
              </a>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(`To: ${email}\n\n${last.message}\n\n${last.name}\n${last.email}`);
                    setCopied(true);
                  } catch {
                    setCopied(false);
                  }
                }}
                className="inline-flex min-h-12 items-center rounded-full border border-paper/25 px-5 text-[0.9375rem]"
              >
                {copied ? "Copied" : "Copy message"}
              </button>
            </div>
            <button type="button" onClick={() => setStatus("idle")} className="eyebrow link-line self-start text-grey">
              Edit message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            onInput={(e) => {
              const n = (e.target as HTMLInputElement).name as keyof Payload;
              if (errors[n]) setErrors((prev) => ({ ...prev, [n]: undefined }));
            }}
            initial={false}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-8"
            aria-describedby={`${uid}-hint`}
          >
            <p id={`${uid}-hint`} className="sr-only">
              Name, email and message are required.
            </p>
            {/* honeypot */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor={`${uid}-website`}>Website</label>
              <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <fieldset>
              <legend className={label}>What’s it about?</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {TOPICS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={topic === t}
                    onClick={() => setTopic(t)}
                    className={cn(
                      "min-h-10 rounded-full border px-4 text-[0.875rem] transition-colors duration-300",
                      topic === t ? "border-paper bg-paper text-ink" : "border-paper/25 text-paper hover:border-paper"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-8 sm:grid-cols-2">
              {(
                [
                  ["name", "Your name", "text", "name"],
                  ["email", "Email", "email", "email"],
                ] as const
              ).map(([n, l, type, ac]) => (
                <div key={n}>
                  <label htmlFor={`${uid}-${n}`} className={label}>
                    {l}
                  </label>
                  <input
                    id={`${uid}-${n}`}
                    name={n}
                    type={type}
                    autoComplete={ac}
                    required
                    aria-invalid={Boolean(errors[n]) || undefined}
                    aria-describedby={errors[n] ? `${uid}-${n}-err` : undefined}
                    className={field}
                  />
                  {errors[n] && (
                    <p id={`${uid}-${n}-err`} className="mt-2 text-sm text-blush">
                      {errors[n]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div>
              <label htmlFor={`${uid}-organization`} className={label}>
                Organization <span className="normal-case tracking-normal text-paper/40">(optional)</span>
              </label>
              <input id={`${uid}-organization`} name="organization" autoComplete="organization" className={field} />
            </div>

            <div>
              <label htmlFor={`${uid}-message`} className={label}>
                Message
              </label>
              <textarea
                id={`${uid}-message`}
                name="message"
                rows={4}
                required
                aria-invalid={Boolean(errors.message) || undefined}
                aria-describedby={errors.message ? `${uid}-message-err` : undefined}
                placeholder="A line or two about what you have in mind."
                className={cn(field, "resize-none")}
              />
              {errors.message && (
                <p id={`${uid}-message-err`} className="mt-2 text-sm text-blush">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <Magnetic>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex min-h-14 items-center gap-3 rounded-full bg-paper py-2 pl-6 pr-2 text-base font-medium text-ink transition-opacity disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-paper">
                    <Arrow />
                  </span>
                </button>
              </Magnetic>
              {status === "error" && (
                <p role="alert" className="text-sm text-blush">
                  That didn’t go through. Please try again, or email {email}.
                </p>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
