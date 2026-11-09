import { cn } from "@/lib/utils";

/** Publicus-style numbered eyebrow: "02 — By the numbers". */
export function Eyebrow({
  index,
  children,
  className,
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", className)}>
      {index && <span className="opacity-100">{index}</span>}
      {index && <span aria-hidden className="h-px w-6 bg-current opacity-40" />}
      <span className="opacity-70">{children}</span>
    </p>
  );
}
