"use client";

import { useMediaQuery, useWebGL } from "@/lib/hooks";
import { AmbientField } from "./index";

/** Mounts the fixed fluid background (static for reduced motion; none without WebGL). */
export function Ambient() {
  const ok = useWebGL();
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  if (!ok) return null;
  return <AmbientField still={reduce} />;
}
