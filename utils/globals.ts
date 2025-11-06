import * as schema from "@/db/schema";
import { Employee } from "@/types/globals";
import { format } from "date-fns";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext as SQLiteContext } from "expo-sqlite";

export const getDb = () => {
  return drizzle(SQLiteContext(), { schema });
};

export const formatNumber = (number: string | number) => {
  return Number(number).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatDate = (
  date: Date,
  dateFormat: string = "MMMM dd, yyyy"
) => {
  return format(date, dateFormat);
};

export const calculate = (employee: Employee) => {
  const gross = employee.rate * employee.hours;
  const tax = gross * 0.1;
  const sss = gross * 0.03;
  const phil = gross * 0.02;
  const deductions = tax + sss + phil;
  const net = gross - deductions;
  return { gross, tax, sss, phil, deductions, net };
};
