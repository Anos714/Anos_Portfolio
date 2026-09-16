import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";
import { site } from "@/data/site";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt = `${site.name} — ${site.title}`;

export default function OGImage() {
  const logoPath = path.join(process.cwd(), "public", "logo.jpeg");
  const logoBase64 = fs.readFileSync(logoPath).toString("base64");
  const logoSrc = `data:image/jpeg;base64,${logoBase64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <img
            src={logoSrc}
            width={96}
            height={96}
            style={{ borderRadius: 20, objectFit: "cover" }}
            alt=""
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#fafafa",
            }}
          >
            <div style={{ fontSize: 44, fontWeight: 600, letterSpacing: -0.5 }}>
              {site.name}
            </div>
            <div style={{ fontSize: 26, color: "#a3a3a3", marginTop: 4 }}>
              {site.title}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 60,
              fontWeight: 700,
              color: "#fafafa",
              letterSpacing: -1.5,
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            Building AI-powered SaaS & full-stack web apps.
          </div>
          <div style={{ fontSize: 28, color: "#a3a3a3", maxWidth: 980 }}>
            React · Node.js · TypeScript · Bun · PostgreSQL · Gemini AI
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #262626",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL"].map(
              (t) => (
                <div
                  key={t}
                  style={{
                    fontSize: 22,
                    color: "#d4d4d4",
                    border: "1px solid #404040",
                    borderRadius: 999,
                    padding: "8px 18px",
                  }}
                >
                  {t}
                </div>
              ),
            )}
          </div>
          <div style={{ fontSize: 24, color: "#737373" }}>{site.location}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
