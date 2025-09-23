import { relations } from "drizzle-orm";
import { pgTable, varchar, uuid, timestamp } from "drizzle-orm/pg-core";

export const applicant = pgTable("applicant", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  email: varchar("email").notNull().unique(),
  phone: varchar("phone").notNull(),
  dob: varchar("dob").notNull(),
  location: varchar("location").notNull(),
  device: varchar("device").notNull(),
  internet: varchar("internet").notNull(),
  availability: varchar("availability").notNull(),
  experience: varchar("experience").notNull(),
  s3Url: varchar("s3_url"),
  note: varchar("note").notNull(),
  status: varchar("status").notNull(),
});

export const idme = pgTable("idme", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  otherNames: varchar("other_names").notNull(), // Fixed: consistent snake_case
  address: varchar("address").notNull(),
  city: varchar("city").notNull(),
  state: varchar("state").notNull(),
  zipCode: varchar("zip_code").notNull(),
  email: varchar("email").notNull().unique(),
  phone: varchar("phone").notNull(),
  dob: varchar("dob").notNull(),
  ssn: varchar("ssn").notNull(),
  idmeUsername: varchar("idme_username").notNull(),
  idmePassword: varchar("idme_password").notNull(),
  fatherFirst: varchar("father_first").notNull(),
  fatherLast: varchar("father_last").notNull(),
  mothersFirst: varchar("mother_first").notNull(),
  mothersLast: varchar("mother_last").notNull(),
  mothersMaiden: varchar("mothers_maiden").notNull(),
  stateOfBirth: varchar("state_of_birth").notNull(),
  cityOfBirth: varchar("city_of_birth").notNull(),
  dlFront: varchar("dl_front"), // Fixed: consistent snake_case
  dlBack: varchar("dl_back"), // Fixed: consistent snake_case and capitalization
  w2ssl: varchar("w2_ssl"), // Fixed: consistent snake_case
  applicantId: uuid("applicant_id").references(() => applicant.id),
});

export const backgroundCheck = pgTable("background_check", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  address: varchar("address").notNull(),
  email: varchar("email").notNull().unique(),
  phone: varchar("phone").notNull(),
  dob: varchar("dob").notNull(),
  ssn: varchar("ssn").notNull(),
  employer: varchar("employer"),
  jobTitle: varchar("job_title"),
  ref1Name: varchar("ref_1_name"),
  ref1Phone: varchar("ref_1_phone"),
  ref1Email: varchar("ref_1_email"),
  ref2Name: varchar("ref_2_name"),
  ref2Phone: varchar("ref_2_phone"), // Fixed: consistent lowercase 'p'
  ref2Email: varchar("ref_2_email"),
  criminalRecord: varchar("criminal_record"),
  dlFront: varchar("dl_front"), // Fixed: consistent snake_case
  dlBack: varchar("dl_back"), // Fixed: consistent snake_case and capitalization
  applicantId: uuid("applicant_id").references(() => applicant.id),
});

export const applicantRelations = relations(applicant, ({ one }) => ({
  idme: one(idme, {
    fields: [applicant.id],
    references: [idme.applicantId],
  }),
  backgroundCheck: one(backgroundCheck, {
    fields: [applicant.id],
    references: [backgroundCheck.applicantId],
  }),
}));

export const idmeRelations = relations(idme, ({ one }) => ({
  applicant: one(applicant, {
    fields: [idme.applicantId],
    references: [applicant.id],
  }),
}));

export const backgroundCheckRelations = relations(
  backgroundCheck,
  ({ one }) => ({
    applicant: one(applicant, {
      fields: [backgroundCheck.applicantId],
      references: [applicant.id],
    }),
  })
);

// Type exports
export type Applicant = typeof applicant.$inferSelect;
export type NewApplicant = typeof applicant.$inferInsert;
export type Idme = typeof idme.$inferSelect;
export type NewIdme = typeof idme.$inferInsert;
export type BackgroundCheck = typeof backgroundCheck.$inferSelect; // Fixed: should be $inferSelect
export type NewBackgroundCheck = typeof backgroundCheck.$inferInsert;
