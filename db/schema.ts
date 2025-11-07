import { relations } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const employees = sqliteTable("employees", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  employee_id: text("employee_id").notNull(),
  last_name: text("last_name").notNull(),
  first_name: text("first_name").notNull(),
  middle_initial: text("middle_initial").notNull(),
  position: text("position").notNull(),
  rate: real("rate").notNull(),
});

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

export const employeesRelation = relations(employees, ({ many }) => ({
  attendances: many(attendances),
}));

export const attendancesRelation = relations(attendances, ({ one }) => ({
  employee: one(employees, {
    fields: [attendances.employee_id],
    references: [employees.id],
  }),
}));
