import type { Config } from "drizzle-kit";

export default {
  schema: "./lib/db/schema.ts", // your schema
  out: "./drizzle", // migrations folder
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
} satisfies Config;
