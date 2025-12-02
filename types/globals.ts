import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";
import { ReactNode } from "react";

export type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export type Db = ExpoSQLiteDatabase<typeof import("@/db/schema")> & {
  $client: SQLiteDatabase;
};

export type Column<T> = {
  key: string;
  header: string;
  width: number;
  render?: (row: T) => ReactNode;
};

export type Employee = {
  id: number;
  employee_id: string;
  last_name: string;
  first_name: string;
  middle_initial: string;
  position: string;
  rate: number;
};
