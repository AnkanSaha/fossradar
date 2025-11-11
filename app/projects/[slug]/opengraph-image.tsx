import { ImageResponse } from "next/og";
import { loadAllProjects } from "@/lib/projects";

export const alt = "FOSSRadar Project";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const projects = loadAllProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000",
            color: "#fff",
            fontSize: 60,
          }}
        >
          Project Not Found
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#1e293b",
          padding: "60px 80px",
        }}
      >
        {/* Project Name + Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <div style={{ fontSize: 64, fontWeight: 700, color: "#fff", maxWidth: "700px" }}>
            {project.name}
          </div>
          <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
            {project.verified && (
              <div
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#3b82f6",
                  borderRadius: "8px",
                  fontSize: 18,
                  color: "#fff",
                  fontWeight: 600,
                  display: "flex",
                }}
              >
                ✓ Verified
              </div>
            )}
            {project.looking_for_contributors && (
              <div
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#10b981",
                  borderRadius: "8px",
                  fontSize: 18,
                  color: "#fff",
                  fontWeight: 600,
                  display: "flex",
                }}
              >
                👥 Contributors
              </div>
            )}
          </div>
        </div>

        {/* Meta Info */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "24px", flexWrap: "wrap" }}>
          <div
            style={{
              padding: "6px 12px",
              backgroundColor: "#334155",
              borderRadius: "6px",
              fontSize: 16,
              color: "#cbd5e1",
              display: "flex",
            }}
          >
            {project.primary_lang}
          </div>
          <div style={{ fontSize: 16, color: "#94a3b8", display: "flex", alignItems: "center" }}>
            📍 {project.location_city}
          </div>
        </div>

        {/* Description - CRITICAL FIX */}
        <div
          style={{
            fontSize: 24,
            color: "#f1f5f9",
            marginBottom: "28px",
            lineHeight: "1.5",
          }}
        >
          {project.short_desc}
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "auto", flexWrap: "wrap" }}>
          {project.tags.slice(0, 4).map((tag, i) => (
            <div
              key={i}
              style={{
                padding: "8px 14px",
                backgroundColor: "#3b82f6",
                borderRadius: "8px",
                fontSize: 16,
                color: "#fff",
                display: "flex",
              }}
            >
              {tag}
            </div>
          ))}
          {project.tags.length > 4 && (
            <div
              style={{
                padding: "8px 14px",
                backgroundColor: "#334155",
                borderRadius: "8px",
                fontSize: 16,
                color: "#94a3b8",
                display: "flex",
              }}
            >
              +{project.tags.length - 4}
            </div>
          )}
        </div>

        {/* Stars */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "28px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 20px",
              backgroundColor: "#fbbf24",
              borderRadius: "10px",
            }}
          >
            <div style={{ fontSize: 32 }}>⭐</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: "#000" }}>
              {project.stars || 0}
            </div>
          </div>
          <div style={{ fontSize: 20, color: "#64748b" }}>stars</div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "32px",
            paddingTop: "24px",
            borderTop: "2px solid #334155",
          }}
        >
          <div style={{ fontSize: 22, color: "#64748b", fontWeight: 600 }}>fossradar.in</div>
          <div style={{ fontSize: 18, color: "#475569" }}>India's Open Source Directory</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
