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
  employee?: Employee;
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
  schedule?: Schedule | null;
  attendances?: Attendance[];
  claims?: Claim[];
  advances?: Advance[];
};

export type Schedule = {
  id: number;
  am_in: string;
  am_out: string;
  pm_in: string;
  pm_out: string;
  employees?: Employee[];
};

export type Claim = {
  id: number;
  reason: string;
  date: string;
  amount: number;
  employee_id: number;
  employee?: Employee;
};

export type Advance = {
  id: number;
  reason: string;
  date: string;
  amount: number;
  employee_id: number;
  employee?: Employee;
};
