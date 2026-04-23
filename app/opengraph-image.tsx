import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Vanttage — Software Boutique · Cartagena, Colombia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #06060C 0%, #061729 40%, #0a1f3d 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background accent dots */}
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle at 80% 20%, rgba(99,102,241,0.18) 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle at 20% 80%, rgba(139,92,246,0.12) 0%, transparent 60%)",
          }}
        />

        {/* Grid lines subtle */}
        <div
          style={{
            position: "absolute",
            inset: "0",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top — Logo + badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", zIndex: 1 }}>
          {/* Logo mark */}
          <div
            style={{
              width: "52px",
              height: "52px",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: "26px",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-1px",
              }}
            >
              V
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#F8FAFC",
                letterSpacing: "-0.5px",
              }}
            >
              Vanttage
            </span>
            <span style={{ fontSize: "13px", color: "#94a3b8", letterSpacing: "0.5px" }}>
              SOFTWARE BOUTIQUE
            </span>
          </div>

          <div
            style={{
              marginLeft: "24px",
              padding: "6px 16px",
              background: "rgba(99,102,241,0.15)",
              border: "1px solid rgba(99,102,241,0.35)",
              borderRadius: "100px",
              fontSize: "13px",
              color: "#a5b4fc",
              letterSpacing: "0.3px",
            }}
          >
            Cartagena, Colombia
          </div>
        </div>

        {/* Main headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", zIndex: 1 }}>
          <div
            style={{
              fontSize: "68px",
              fontWeight: 800,
              color: "#F8FAFC",
              lineHeight: 1.05,
              letterSpacing: "-2px",
              maxWidth: "800px",
            }}
          >
            Deja de perseguir leads.
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #6366f1 0%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Empieza a cerrar.
            </span>
          </div>

          <p
            style={{
              fontSize: "22px",
              color: "#94a3b8",
              maxWidth: "700px",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            Desarrollo web, software a medida y automatizaciones que convierten
            visitas en clientes reales.
          </p>
        </div>

        {/* Bottom row — stats */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "48px",
            zIndex: 1,
            width: "100%",
          }}
        >
          {[
            { value: "+12", label: "Proyectos" },
            { value: "100%", label: "Satisfacción" },
            { value: "<24h", label: "Respuesta" },
          ].map((stat) => (
            <div key={stat.label} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span
                style={{
                  fontSize: "36px",
                  fontWeight: 800,
                  color: "#F8FAFC",
                  letterSpacing: "-1px",
                }}
              >
                {stat.value}
              </span>
              <span style={{ fontSize: "14px", color: "#64748b", letterSpacing: "0.5px" }}>
                {stat.label.toUpperCase()}
              </span>
            </div>
          ))}

          <div
            style={{
              marginLeft: "auto",
              padding: "14px 32px",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              borderRadius: "12px",
              fontSize: "18px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.3px",
            }}
          >
            vanttagetech.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
