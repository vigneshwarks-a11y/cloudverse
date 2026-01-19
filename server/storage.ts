import { type User, type InsertUser, type PartnerInquiry, type InsertPartnerInquiry, type DemoInquiry, type InsertDemoInquiry, users, partnerInquiries, demoInquiries } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createPartnerInquiry(inquiry: InsertPartnerInquiry): Promise<PartnerInquiry>;
  createDemoInquiry(inquiry: InsertDemoInquiry): Promise<DemoInquiry>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createPartnerInquiry(inquiry: InsertPartnerInquiry): Promise<PartnerInquiry> {
    const [result] = await db.insert(partnerInquiries).values(inquiry).returning();
    return result;
  }

  async createDemoInquiry(inquiry: InsertDemoInquiry): Promise<DemoInquiry> {
    const [result] = await db.insert(demoInquiries).values(inquiry).returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
