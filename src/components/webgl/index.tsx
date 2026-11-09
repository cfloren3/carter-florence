"use client";

/** Client-only, code-split entry points for the WebGL scenes (three.js never ships in the server bundle). */
import dynamic from "next/dynamic";

export const AmbientField = dynamic(() => import("./AmbientField"), { ssr: false });
export const HeroParticles = dynamic(() => import("./HeroParticles"), { ssr: false });
export const MorphBlob = dynamic(() => import("./MorphBlob"), { ssr: false });
