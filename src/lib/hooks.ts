"use client";
import { useSyncExternalStore } from "react";

/** SSR-safe media query subscription (false on the server). */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

const noop = () => () => {};
/** Current year on the client; falls back to the build year during SSR. */
export function useYear(fallback: number) {
  return useSyncExternalStore(noop, () => new Date().getFullYear(), () => fallback);
}

/** True only in a browser that can create a WebGL context (false during SSR). */
export function useWebGL() {
  return useSyncExternalStore(
    noop,
    () => {
      const w = window as unknown as { __cfGL?: boolean };
      if (w.__cfGL === undefined) {
        try {
          const c = document.createElement("canvas");
          w.__cfGL = Boolean(c.getContext("webgl2") || c.getContext("webgl"));
        } catch {
          w.__cfGL = false;
        }
      }
      return w.__cfGL;
    },
    () => false
  );
}
