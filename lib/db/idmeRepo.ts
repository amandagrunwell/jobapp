// src/db/applicantsRepo.ts
import { db } from "./index";
import { eq } from "drizzle-orm";
import { idme, NewIdme } from "./schema";

// ✅ Create
// export async function createIdme(data: typeof idme.$inferInsert) {
//   const [inserted] = await db.insert(idme).values(data).returning();
//   return inserted;
// }

export async function createIdme(idmeData: NewIdme) {
  const [inserted] = await db.insert(idme).values(idmeData).returning();
  return inserted;
}

// ✅ Read (all)
// export async function getAllApplicants() {
//   return db.select().from(applicant);
// }

// ✅ Read (by ID)
// export async function getApplicantById(email: string) {
//   const [record] = await db.select().from(idme).where(eq(id.id, id));
//   return record;
// }

// // ✅ Update
// export async function updateApplicant(
//   id: string,
//   updates: Partial<typeof applicant.$inferInsert>
// ) {
//   const [updated] = await db
//     .update(applicant)
//     .set(updates)
//     .where(eq(applicant.id, id))
//     .returning();
//   return updated;
// }

// // ✅ Delete
// export async function deleteApplicant(id: string) {
//   const [deleted] = await db
//     .delete(applicant)
//     .where(eq(applicant.id, id))
//     .returning();
//   return deleted;
// }
