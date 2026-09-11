import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#030303",
          color: "#e12020",
        }}
      >
        <div style={{ fontSize: 36, fontWeight: 700, color: "#fce08b" }}>
          Full-Stack Developer
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 900,
            lineHeight: 1,
            marginTop: 16,
          }}
        >
          Mohamad Fajar
          <br />
          Nur Khasani
        </div>
        <div style={{ fontSize: 28, marginTop: 24, color: "#ffffff" }}>
          Next.js • React • Laravel • mhmdfjr.vercel.app
        </div>
      </div>
    ),
    { ...size },
  );
}
