import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const employees = sqliteTable("employees", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  last_name: text("last_name").notNull(),
  first_name: text("first_name").notNull(),
  middle_initial: text("middle_initial").notNull(),
  position: text("position").notNull(),
  rate: real("rate").notNull(),
});
