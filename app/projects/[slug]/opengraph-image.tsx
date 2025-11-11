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

  // Load all projects using the same method as the page
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
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000",
            color: "#fff",
          }}
        >
          <div style={{ fontSize: 60 }}>Project Not Found</div>
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0a0a0a",
          padding: "60px 80px",
        }}
      >
        {/* Card Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#1a1a1a",
            borderRadius: "24px",
            border: "2px solid #2a2a2a",
            padding: "50px",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Header: Project Name + Badges */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                fontSize: 56,
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.02em",
              }}
            >
              {project.name}
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              {project.verified && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 16px",
                    backgroundColor: "rgba(59, 130, 246, 0.15)",
                    border: "1.5px solid rgba(59, 130, 246, 0.3)",
                    borderRadius: "8px",
                    fontSize: 18,
                    color: "#60a5fa",
                    fontWeight: 600,
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "#3b82f6",
                    }}
                  />
                  Verified
                </div>
              )}
              {project.looking_for_contributors && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 16px",
                    backgroundColor: "rgba(16, 185, 129, 0.15)",
                    border: "1.5px solid rgba(16, 185, 129, 0.3)",
                    borderRadius: "8px",
                    fontSize: 18,
                    color: "#34d399",
                    fontWeight: 600,
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "#10b981",
                    }}
                  />
                  Contributors
                </div>
              )}
            </div>
          </div>

          {/* Meta: Language + Location */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "6px 14px",
                backgroundColor: "#2a2a2a",
                borderRadius: "6px",
                fontSize: 16,
                color: "#9ca3af",
                fontWeight: 500,
              }}
            >
              {project.primary_lang}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: 16,
                color: "#9ca3af",
              }}
            >
              📍 {project.location_city}
            </div>
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 24,
              lineHeight: 1.5,
              color: "#d1d5db",
              marginBottom: "30px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.short_desc}
          </div>

          {/* Tags */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "30px",
            }}
          >
            {project.tags.slice(0, 4).map((tag) => (
              <div
                key={tag}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                  borderRadius: "8px",
                  fontSize: 16,
                  color: "#60a5fa",
                  fontWeight: 500,
                }}
              >
                {tag}
              </div>
            ))}
            {project.tags.length > 4 && (
              <div
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#2a2a2a",
                  borderRadius: "8px",
                  fontSize: 16,
                  color: "#6b7280",
                  fontWeight: 500,
                }}
              >
                +{project.tags.length - 4}
              </div>
            )}
          </div>

          {/* Stars */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 20px",
                backgroundColor: "rgba(251, 191, 36, 0.1)",
                border: "1px solid rgba(251, 191, 36, 0.2)",
                borderRadius: "10px",
              }}
            >
              <div style={{ fontSize: 28 }}>⭐</div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                {project.stars || 0}
              </div>
            </div>
            <div style={{ fontSize: 18, color: "#6b7280" }}>stars</div>
          </div>

          {/* Footer: FOSSRadar branding */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "30px",
              paddingTop: "30px",
              borderTop: "1px solid #2a2a2a",
            }}
          >
            <div style={{ fontSize: 20, color: "#6b7280", fontWeight: 600 }}>
              fossradar.in
            </div>
            <div style={{ fontSize: 16, color: "#4b5563" }}>
              India's Open Source Directory
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
