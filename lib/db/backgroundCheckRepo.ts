import { db } from ".";
import { backgroundCheck, NewBackgroundCheck } from "./schema";

export async function createBackgroundCheck(
  backgroundeData: NewBackgroundCheck
) {
  const [inserted] = await db
    .insert(backgroundCheck)
    .values(backgroundeData)
    .returning();
  return inserted;
}
