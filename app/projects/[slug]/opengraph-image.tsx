import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/lib/projects";

export const alt = "FOSSRadar Project";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

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
        {/* Header with Logo + Project Name + Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "20px", alignItems: "center", flex: 1, minWidth: 0 }}>
            {project.logo && (
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  padding: "12px",
                }}
              >
                <img
                  src={`https://fossradar.in${project.logo}`}
                  width="56"
                  height="56"
                  style={{ objectFit: "contain" }}
                />
              </div>
            )}
            <div style={{ fontSize: 64, fontWeight: 700, color: "#fff", flex: 1, minWidth: 0 }}>
              {project.name}
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", flexShrink: 0, flexWrap: "wrap", maxWidth: "400px", justifyContent: "flex-end" }}>
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
            {project.india_connection && (
              <div
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#f97316",
                  borderRadius: "8px",
                  fontSize: 18,
                  color: "#fff",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                🇮🇳 {project.india_connection === "founder" ? "Founder" :
                     project.india_connection === "organization" ? "Organization" :
                     project.india_connection === "community" ? "Community" : "Contributors"}
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
        <div style={{ display: "flex", gap: "20px", marginBottom: "24px", flexWrap: "wrap", alignItems: "center" }}>
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
          <div
            style={{
              padding: "6px 12px",
              backgroundColor: "#1e3a8a",
              borderRadius: "6px",
              fontSize: 16,
              color: "#93c5fd",
              display: "flex",
              fontWeight: 600,
            }}
          >
            {project.license}
          </div>
          <div style={{ fontSize: 16, color: "#94a3b8", display: "flex", alignItems: "center", fontWeight: 500 }}>
            📍 {project.location_city}, {project.location_indian_state}
          </div>
          {project.good_first_issues && project.good_first_issues > 0 && (
            <div
              style={{
                padding: "6px 12px",
                backgroundColor: "#065f46",
                borderRadius: "6px",
                fontSize: 16,
                color: "#6ee7b7",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontWeight: 600,
              }}
            >
              ✨ {project.good_first_issues} good first issues
            </div>
          )}
        </div>

        {/* Description */}
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
          {project.tags.slice(0, 4).map((tag: string, i: number) => (
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

        {/* Stars & Added Date */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              backgroundColor: "#1e293b",
              borderRadius: "8px",
              border: "1px solid #334155",
            }}
          >
            <div style={{ fontSize: 18, color: "#94a3b8" }}>📅</div>
            <div style={{ fontSize: 18, color: "#cbd5e1", fontWeight: 500 }}>
              Added {new Date(project.added_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </div>
          </div>
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
