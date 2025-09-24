import type { Config } from "drizzle-kit";

export default {
  schema: "./lib/db/schema.ts", // adjust path to your schema
  out: "./drizzle", // where migrations go
  dialect: "postgresql", // ✅ required
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
    ssl: { rejectUnauthorized: true, ca: process.env.RDS_CA_BUNDLE },
  },
} satisfies Config;
