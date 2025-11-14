import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";

export type Db = ExpoSQLiteDatabase<typeof import("@/db/schema")> & {
  $client: SQLiteDatabase;
};

export type Employee = {
  id: number;
  employee_id: string;
  last_name: string;
  first_name: string;
  middle_initial: string;
  position: string;
  rate: number;
  schedule_id: number | null;
  schedule: Schedule | null;
};

export type Schedule = {
  id: number;
  am_in: string;
  am_out: string;
  pm_in: string;
  pm_out: string;
};

export type Attendance = {
  id: number;
  date: string;
  am_in: string | null;
  am_out: string | null;
  pm_in: string | null;
  pm_out: string | null;
  ot_in: string | null;
  ot_out: string | null;
  employee_id: number;
  employee: Employee;
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
