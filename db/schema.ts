import { relations } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const attendances = sqliteTable("attendances", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  date: text("date").notNull(),
  am_in: text("am_in"),
  am_out: text("am_out"),
  pm_in: text("pm_in"),
  pm_out: text("pm_out"),
  ot_in: text("ot_in"),
  ot_out: text("ot_out"),
  employee_id: integer("employee_id")
    .notNull()
    .references(() => employees.id),
});

export const employees = sqliteTable("employees", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  employee_id: text("employee_id").notNull(),
  last_name: text("last_name").notNull(),
  first_name: text("first_name").notNull(),
  middle_initial: text("middle_initial").notNull(),
  position: text("position").notNull(),
  rate: real("rate").notNull(),
  schedule_id: integer("schedule_id").references(() => schedules.id),
});

export const schedules = sqliteTable("schedules", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  am_in: text("am_in").notNull(),
  am_out: text("am_out").notNull(),
  pm_in: text("pm_in").notNull(),
  pm_out: text("pm_out").notNull(),
});

export const advances = sqliteTable("advances", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  date: text("date").notNull(),
  amount: real("amount").notNull(),
  employee_id: integer()
    .references(() => employees.id)
    .notNull(),
});

export const settings = sqliteTable("settings", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
});

export const attendancesRelation = relations(attendances, ({ one }) => ({
  employee: one(employees, {
    fields: [attendances.employee_id],
    references: [employees.id],
  }),
}));

export const employeesRelation = relations(employees, ({ one, many }) => ({
  schedule: one(schedules, {
    fields: [employees.schedule_id],
    references: [schedules.id],
  }),
  attendances: many(attendances),
  advances: many(advances),
}));

export const schedulesRelation = relations(schedules, ({ many }) => ({
  employees: many(employees),
}));

export const advancesRelation = relations(advances, ({ one }) => ({
  employee: one(employees, {
    fields: [advances.employee_id],
    references: [employees.id],
  }),
}));
