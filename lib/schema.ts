import { z } from "zod";

// Reserved slugs that cannot be used for projects
const RESERVED_SLUGS = [
  "new",
  "admin",
  "api",
  "auth",
  "projects",
  "tags",
  "search",
  "submit",
  "about",
  "privacy",
  "terms",
];

// Project TOML schema
export const ProjectSchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens")
    .min(2, "Slug must be at least 2 characters")
    .max(60, "Slug must be at most 60 characters")
    .refine((slug) => !RESERVED_SLUGS.includes(slug), {
      message: "This slug is reserved and cannot be used",
    }),

  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must be at most 80 characters"),

  short_desc: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(160, "Description must be at most 160 characters"),

  website: z
    .string()
    .transform((val) => val === "" ? undefined : val)
    .pipe(z.string().url("Website must be a valid URL").optional()),

  repo: z
    .string()
    .url("Repository must be a valid URL")
    .regex(/^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/, "Must be a valid GitHub repository URL"),

  license: z.string().min(1, "License is required"),

  logo: z
    .string()
    .transform((val) => val === "" ? undefined : val)
    .pipe(
      z
        .string()
        .regex(/^\/logos\/[^/]+\.(svg|png|jpg|jpeg|webp)$/, "Logo must be under /logos/ and be a valid image format")
        .optional()
    ),

  added_at: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),

  primary_lang: z.string().min(1, "Primary language is required"),

  category: z.string().min(1, "Category is required"),

  tags: z
    .array(z.string())
    .min(1, "At least one tag is required")
    .max(10, "Maximum 10 tags allowed"),

  looking_for_contributors: z.boolean(),

  location_city: z
    .string()
    .min(2, "City name must be at least 2 characters")
    .max(100, "City name must be at most 100 characters"),

  location_indian_state: z
    .string()
    .min(2, "State name must be at least 2 characters")
    .max(100, "State name must be at most 100 characters"),

  good_first_issues: z.number().int().nonnegative().optional().default(0),

  stars: z.number().int().nonnegative().optional().default(0),

  verified: z.boolean().optional().default(false),

  india_connection: z
    .enum(["founder", "organization", "community", "contributor"])
    .optional()
    .describe("Type of India connection: founder (from India), organization (based in India), community (serves India), contributor (significant India contributors)"),

  india_connection_details: z
    .string()
    .max(500)
    .optional()
    .describe("Brief description of the India connection"),
});

export type Project = z.infer<typeof ProjectSchema>;

// Search index item (minimal subset for client-side)
export const SearchIndexItemSchema = z.object({
  slug: z.string(),
  name: z.string(),
  short_desc: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  stars: z.number().default(0),
  primary_lang: z.string(),
  verified: z.boolean().default(false),
  added_at: z.string(),
  looking_for_contributors: z.boolean(),
  location_city: z.string(),
  location_indian_state: z.string(),
});

export type SearchIndexItem = z.infer<typeof SearchIndexItemSchema>;

// Form submission schema (for API route)
export const ProjectSubmissionSchema = ProjectSchema.omit({
  stars: true,
  good_first_issues: true,
  verified: true,
}).extend({
  submitter_notes: z.string().max(500).optional(),
});

export type ProjectSubmission = z.infer<typeof ProjectSubmissionSchema>;
