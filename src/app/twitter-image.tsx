export const dynamic = "force-static";
import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";
import { profile } from "@/data/profile";
import { assetExists } from "@/lib/assets";

export const alt = "Carter Florence: Entrepreneur, Western University student & aspiring strategist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = path.join(process.cwd(), "node_modules/@fontsource");
const read = (p: string) => fs.readFileSync(path.join(fontDir, p));

/**
 * Branded share card (LinkedIn, X, iMessage…). Uses the original portrait
 * automatically once it exists at profile.portrait.src (JPG or PNG).
 */
export default async function TwitterImage() {
  const serif = read("instrument-serif/files/instrument-serif-latin-400-normal.woff");
  const serifItalic = read("instrument-serif/files/instrument-serif-latin-400-italic.woff");
  const sans = read("inter-tight/files/inter-tight-latin-600-normal.woff");
  const sansMed = read("inter-tight/files/inter-tight-latin-500-normal.woff");

  let portrait: string | null = null;
  if (assetExists(profile.portrait.src)) {
    const file = fs.readFileSync(path.join(process.cwd(), "public", profile.portrait.src));
    const mime = profile.portrait.src.endsWith(".png") ? "image/png" : "image/jpeg";
    portrait = `data:${mime};base64,${file.toString("base64")}`;
  }

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#F7F6F2", color: "#202321", padding: 56 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", fontFamily: "Inter Tight", fontWeight: 500, fontSize: 15, letterSpacing: 3, color: "#5E625F" }}>
            PORTFOLIO · ONTARIO, CANADA
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Inter Tight", fontWeight: 600, fontSize: 132, lineHeight: 0.86, letterSpacing: -7 }}>
            <span>CARTER</span>
            <span>
              FLORENCE<span style={{ color: "#D6B5B4" }}>.</span>
            </span>
            <span style={{ fontFamily: "Instrument Serif", fontStyle: "italic", fontWeight: 400, fontSize: 44, letterSpacing: -0.5, marginTop: 28 }}>
              Entrepreneur. Student. Builder.
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontFamily: "Inter Tight", fontWeight: 500, fontSize: 21 }}>
            <div style={{ display: "flex", height: 1, width: 640, background: "#D9D7D1" }} />
            <span>Western University · International Relations · Ivey AEO</span>
            <span style={{ color: "#5E625F" }}>Finance · Strategy · Consulting · Entrepreneurship</span>
          </div>
        </div>
        <div style={{ display: "flex", width: 400, height: "100%", background: "linear-gradient(160deg, #E6E4DE, #B8BAB7)", position: "relative" }}>
          {portrait ? (
            <img src={portrait} alt="" width={400} height={518} style={{ objectFit: "cover", width: "100%", height: "100%", objectPosition: profile.portrait.focus }} />
          ) : (
            <div style={{ display: "flex", flex: 1, alignItems: "flex-end", justifyContent: "flex-end", padding: 24, fontFamily: "Inter Tight", fontWeight: 600, fontSize: 200, letterSpacing: -10, color: "rgba(32,35,33,0.12)" }}>
              CF
            </div>
          )}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
        { name: "Instrument Serif", data: serifItalic, style: "italic", weight: 400 },
        { name: "Inter Tight", data: sans, style: "normal", weight: 600 },
        { name: "Inter Tight", data: sansMed, style: "normal", weight: 500 },
      ],
    }
  );
}
