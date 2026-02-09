// utils/domainUtils.ts
export function extractDomainFromEmail(email: string): string | null {
  if (!email || typeof email !== "string") return null;
  if (!email.includes("@")) return null;

  const parts = email.split("@");
  if (parts.length < 2) return null;

  const domain = parts[1].toLowerCase().trim();
  return domain || null;
}

export function normalizeDomain(domain: string): string {
  if (!domain || typeof domain !== "string") return "";

  let normalized = domain.toLowerCase().trim();

  // Remove protocol if present
  normalized = normalized.replace(/^https?:\/\//, "");

  // Remove www. if present
  normalized = normalized.replace(/^www\./, "");

  // Remove trailing slashes
  normalized = normalized.replace(/\/+$/, "");

  return normalized;
}
