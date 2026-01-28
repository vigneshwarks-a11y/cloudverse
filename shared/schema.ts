import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const partnerInquiries = pgTable("partner_inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  businessEmail: text("business_email").notNull(),
  companyName: text("company_name").notNull(),
  phoneNumber: text("phone_number").notNull(),
  countryRegion: text("country_region").notNull(),
  partnerType: text("partner_type").notNull(),
  employeeCount: text("employee_count").notNull(),
  cloudProviders: text("cloud_providers").array().notNull(),
  website: text("website").notNull(),
  message: text("message"),
  agreedToTerms: text("agreed_to_terms").notNull(),
});

export const insertPartnerInquirySchema = createInsertSchema(partnerInquiries).omit({
  id: true,
});

export type InsertPartnerInquiry = z.infer<typeof insertPartnerInquirySchema>;
export type PartnerInquiry = typeof partnerInquiries.$inferSelect;

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const demoInquiries = pgTable("demo_inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  preferredDateTime: text("preferred_date_time").notNull(),
  interestedIntegration: text("interested_integration"),
});

export const insertDemoInquirySchema = createInsertSchema(demoInquiries).omit({
  id: true,
});

export type InsertDemoInquiry = z.infer<typeof insertDemoInquirySchema>;
export type DemoInquiry = typeof demoInquiries.$inferSelect;

export const subscribers = pgTable("subscribers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
});

export const insertSubscriberSchema = createInsertSchema(subscribers).omit({
  id: true,
});

export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type Subscriber = typeof subscribers.$inferSelect;
