import type { Config } from "drizzle-kit";

export default {
  schema: "./lib/db/schema.ts", // adjust path to your schema
  out: "./drizzle", // where migrations go
  dialect: "postgresql", // ✅ required
  dbCredentials: {
    url: "postgres://postgres:1855@localhost:5432/job", // ✅ or use process.env.DATABASE_URL
  },
} satisfies Config;
