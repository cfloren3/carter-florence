import Link from "next/link";
import { Arrow } from "@/components/ui/Arrow";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[85svh] flex-col justify-center pt-28">
      <p className="eyebrow text-mute">404</p>
      <h1 className="t-display mt-6 text-[clamp(4rem,13vw,12rem)] tracking-[-0.03em]">
        Off the <span className="t-serif normal-case tracking-[-0.02em]">map.</span>
      </h1>
      <p className="mt-6 max-w-sm text-mute">That page doesn’t exist. This site is a single page.</p>
      <Link href="/" className="group mt-8 inline-flex min-h-11 items-center gap-3 text-xl font-medium">
        <span className="link-line">Back to the beginning</span>
        <Arrow />
      </Link>
    </section>
  );
}
