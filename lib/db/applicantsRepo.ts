// src/db/applicantsRepo.ts
import { db } from "./index";
import { applicant, backgroundCheck, idme, NewApplicant } from "./schema";
import { eq } from "drizzle-orm";

// ✅ Create
export async function createApplicant(data: NewApplicant) {
  const [inserted] = await db.insert(applicant).values(data).returning();
  return inserted;
}

// ✅ Read (all)

export async function getAllApplicants() {
  return db
    .select({
      applicant,
      idme,
      backgroundCheck,
    })
    .from(applicant)
    .leftJoin(idme, eq(idme.applicantId, applicant.id))
    .leftJoin(backgroundCheck, eq(backgroundCheck.applicantId, applicant.id));
}

// ✅ Read (by ID)
export async function getApplicantById(id: string) {
  const [record] = await db
    .select()
    .from(applicant)
    .where(eq(applicant.id, id));
  return record;
}
export async function getApplicantByEmail(email: string) {
  const [record] = await db
    .select()
    .from(applicant)
    .where(eq(applicant.email, email));
  return record;
}

// ✅ Update
export async function updateApplicant(
  id: string,
  updates: Partial<NewApplicant>
) {
  const [updated] = await db
    .update(applicant)
    .set(updates)
    .where(eq(applicant.id, id))
    .returning();
  return updated;
}

// ✅ Delete
export async function deleteApplicant(id: string) {
  const [deleted] = await db
    .delete(applicant)
    .where(eq(applicant.id, id))
    .returning();
  return deleted;
}
