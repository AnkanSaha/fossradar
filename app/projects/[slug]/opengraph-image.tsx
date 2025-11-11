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

  const truncatedDesc =
    project.short_desc.length > 120
      ? project.short_desc.substring(0, 120) + "..."
      : project.short_desc;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#0f172a",
          position: "relative",
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            opacity: 0.8,
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "60px 80px",
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          {/* Header with badges */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "30px",
            }}
          >
            <div style={{ fontSize: 64, fontWeight: 700, color: "#fff" }}>
              {project.name}
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              {project.verified && (
                <div
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "rgba(59, 130, 246, 0.2)",
                    border: "2px solid rgba(59, 130, 246, 0.4)",
                    borderRadius: "12px",
                    fontSize: 20,
                    color: "#60a5fa",
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
                    padding: "10px 20px",
                    backgroundColor: "rgba(16, 185, 129, 0.2)",
                    border: "2px solid rgba(16, 185, 129, 0.4)",
                    borderRadius: "12px",
                    fontSize: 20,
                    color: "#34d399",
                    fontWeight: 600,
                    display: "flex",
                  }}
                >
                  👥 Contributors
                </div>
              )}
            </div>
          </div>

          {/* Language + Location */}
          <div style={{ display: "flex", gap: "24px", marginBottom: "30px" }}>
            <div
              style={{
                padding: "8px 16px",
                backgroundColor: "#1e293b",
                borderRadius: "8px",
                fontSize: 18,
                color: "#94a3b8",
                fontWeight: 500,
                display: "flex",
              }}
            >
              {project.primary_lang}
            </div>
            <div
              style={{
                fontSize: 18,
                color: "#94a3b8",
                display: "flex",
              }}
            >
              📍 {project.location_city}
            </div>
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.4,
              color: "#cbd5e1",
              marginBottom: "30px",
              maxHeight: "120px",
              overflow: "hidden",
              display: "flex",
            }}
          >
            {truncatedDesc}
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "40px" }}>
            {project.tags.slice(0, 4).map((tag, index) => (
              <div
                key={index}
                style={{
                  padding: "10px 18px",
                  backgroundColor: "rgba(59, 130, 246, 0.15)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  borderRadius: "10px",
                  fontSize: 18,
                  color: "#60a5fa",
                  fontWeight: 500,
                  display: "flex",
                }}
              >
                {tag}
              </div>
            ))}
            {project.tags.length > 4 && (
              <div
                style={{
                  padding: "10px 18px",
                  backgroundColor: "#1e293b",
                  borderRadius: "10px",
                  fontSize: 18,
                  color: "#64748b",
                  fontWeight: 500,
                  display: "flex",
                }}
              >
                +{project.tags.length - 4}
              </div>
            )}
          </div>

          {/* Stars */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "auto" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px 24px",
                backgroundColor: "rgba(251, 191, 36, 0.15)",
                border: "2px solid rgba(251, 191, 36, 0.3)",
                borderRadius: "12px",
              }}
            >
              <div style={{ fontSize: 36 }}>⭐</div>
              <div style={{ fontSize: 42, fontWeight: 700, color: "#fff" }}>
                {project.stars || 0}
              </div>
            </div>
            <div style={{ fontSize: 24, color: "#64748b" }}>stars</div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "40px",
              paddingTop: "30px",
              borderTop: "1px solid #1e293b",
            }}
          >
            <div style={{ fontSize: 24, color: "#64748b", fontWeight: 600, display: "flex" }}>
              fossradar.in
            </div>
            <div style={{ fontSize: 20, color: "#475569", display: "flex" }}>
              India's Open Source Directory
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
