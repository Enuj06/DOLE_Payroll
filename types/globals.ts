import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";

export type Db = ExpoSQLiteDatabase<typeof import("@/db/schema")> & {
  $client: SQLiteDatabase;
};

export type EmployeeDb = {
  id: number;
  last_name: string;
  first_name: string;
  middle_initial: string;
  position: string;
  rate: number;
};

export type Employee = {
  id: number;
  last_name: string;
  first_name: string;
  position: string;
  rate: number;
  hours: number;
};

export type Transaction = {
  id: number;
  last_name: string;
  first_name: string;
  date: Date;
  amount: number;
  method: string;
  details: string;
  status: string;
};
