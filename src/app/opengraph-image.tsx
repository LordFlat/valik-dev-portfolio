import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Valentyn.dev — Websites, landing pages and simple digital tools.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FAF7F0",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 34, color: "#111111" }}>
          <span style={{ fontWeight: 700 }}>Valentyn.dev</span>
          <span style={{ color: "#C2502E", fontWeight: 700 }}>.</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.05,
              fontWeight: 700,
              color: "#111111",
              maxWidth: 980,
            }}
          >
            Beautiful websites for businesses that want to be chosen.
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#6B665F" }}>
            Websites · Landing Pages · Simple Digital Tools
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            color: "#6B665F",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: "#C2502E",
              marginRight: 14,
            }}
          />
          UK-based web designer & automation developer
        </div>
      </div>
    ),
    { ...size },
  );
}
