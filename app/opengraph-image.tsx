import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Vanttage — Páginas Web Profesionales · Cartagena, Colombia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #061729 0%, #0A2540 55%, #0f172a 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "68px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid sutil de fondo */}
        <div
          style={{
            position: "absolute",
            inset: "0",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)",
            backgroundSize: "62px 62px",
          }}
        />

        {/* Glow violeta — arriba izquierda */}
        <div
          style={{
            position: "absolute",
            top: "-130px",
            left: "-100px",
            width: "580px",
            height: "580px",
            background: "radial-gradient(circle, rgba(124,58,237,0.28) 0%, transparent 65%)",
          }}
        />

        {/* Glow índigo — abajo derecha */}
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-80px",
            width: "440px",
            height: "440px",
            background: "radial-gradient(circle, rgba(99,102,241,0.20) 0%, transparent 65%)",
          }}
        />

        {/* ── SECCIÓN SUPERIOR: logo + badge ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            zIndex: 1,
          }}
        >
          {/* Logo mark */}
          <div
            style={{
              width: "54px",
              height: "54px",
              background: "linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 28px rgba(124,58,237,0.45)",
            }}
          >
            <span style={{ fontSize: "26px", fontWeight: 800, color: "#fff" }}>V</span>
          </div>

          {/* Nombre */}
          <span
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#F8FAFC",
              letterSpacing: "-0.4px",
            }}
          >
            Vanttage.
          </span>

          {/* Divider */}
          <div
            style={{
              width: "1px",
              height: "28px",
              background: "rgba(255,255,255,0.15)",
              marginLeft: "8px",
            }}
          />

          {/* Badge localización */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 18px",
              background: "rgba(124,58,237,0.15)",
              border: "1px solid rgba(167,139,250,0.30)",
              borderRadius: "100px",
              fontSize: "13px",
              color: "#a78bfa",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#a78bfa",
              }}
            />
            Cartagena · Colombia
          </div>
        </div>

        {/* ── SECCIÓN CENTRAL: headline ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: "70px",
              fontWeight: 700,
              color: "#F8FAFC",
              lineHeight: 1.04,
              letterSpacing: "-2.5px",
              maxWidth: "820px",
            }}
          >
            Tu página web,
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #a78bfa 0%, #818cf8 100%)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              tu mejor vendedor.
            </span>
          </div>

          <p
            style={{
              fontSize: "22px",
              color: "rgba(255,255,255,0.55)",
              maxWidth: "680px",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            Diseño único, código limpio y resultados reales para tu negocio en internet.
          </p>
        </div>

        {/* ── SECCIÓN INFERIOR: stats + URL ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            zIndex: 1,
          }}
        >
          {/* Stats */}
          <div style={{ display: "flex", alignItems: "center", gap: "0px" }}>
            {[
              { value: "+12", label: "Proyectos" },
              { value: "100%", label: "Satisfacción" },
              { value: "< 24h", label: "Respuesta" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "3px",
                  paddingRight: "48px",
                  paddingLeft: i === 0 ? "0" : "48px",
                  borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <span
                  style={{
                    fontSize: "34px",
                    fontWeight: 700,
                    color: "#F8FAFC",
                    letterSpacing: "-0.5px",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* URL pill */}
          <div
            style={{
              marginLeft: "auto",
              padding: "14px 32px",
              background: "linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)",
              borderRadius: "12px",
              fontSize: "18px",
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: "0.02em",
              boxShadow: "0 0 24px rgba(124,58,237,0.35)",
            }}
          >
            vanttagetech.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
