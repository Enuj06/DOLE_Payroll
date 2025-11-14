import * as schema from "@/db/schema";
import { format } from "date-fns";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";

export const getDb = (sqlDb: SQLiteDatabase) => {
  return drizzle(sqlDb, { schema });
};

export const getDate = (dateTime: Date) => {
  return dateTime.toISOString().split("T")[0];
};

export const getTime = (dateTime: Date) => {
  const time = dateTime.toLocaleTimeString("en-US", {
    timeZone: "Asia/Shanghai",
    hour12: false,
  });
  const components = time.split(":");
  return `${components[0]}:${components[1]}`;
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
