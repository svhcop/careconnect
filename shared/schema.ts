import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firebaseId: text("firebase_id").notNull().unique(),
  email: text("email").notNull(),
  displayName: text("display_name"),
  role: text("role", { enum: ["patient", "doctor"] }).notNull(),
  specialty: text("specialty"),
  phoneNumber: text("phone_number"),
  profileComplete: boolean("profile_complete").default(false),
});

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").references(() => users.id),
  doctorId: integer("doctor_id").references(() => users.id),
  dateTime: timestamp("date_time").notNull(),
  type: text("type", { enum: ["in-person", "virtual"] }).notNull(),
  status: text("status", { enum: ["pending", "confirmed", "cancelled"] }).notNull(),
  notes: text("notes"),
});

export const availability = pgTable("availability", {
  id: serial("id").primaryKey(),
  doctorId: integer("doctor_id").references(() => users.id),
  dayOfWeek: integer("day_of_week").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertAppointmentSchema = createInsertSchema(appointments).omit({ id: true });
export const insertAvailabilitySchema = createInsertSchema(availability).omit({ id: true });

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Availability = typeof availability.$inferSelect;
export type InsertAvailability = z.infer<typeof insertAvailabilitySchema>;
