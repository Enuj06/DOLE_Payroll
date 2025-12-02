import * as schema from "@/db/schema";
import { format, parseISO, set } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";

export const toastVisibilityTime = 2000;

export const getDb = (sqlDb: SQLiteDatabase) => {
  return drizzle(sqlDb, { schema });
};

export const formatDateTime = (
  date: Date | string,
  timeZone: string = "Etc/UTC",
  dateTimeFormat: string = "yyyy-MM-dd\'T\'HH:mm:ss.SSSXX"
) => {
  const formattedDate = parseDate(date);
  return formatInTimeZone(formattedDate, timeZone, dateTimeFormat);
};

export const formatDate = (
  date: Date | string,
  dateFormat: string = "yyyy-MM-dd"
) => {
  const formattedDate = parseDate(date);
  return format(formattedDate, dateFormat);
};

export const formatTime = (
  date: Date | string,
  timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone,
  timeFormat: string = "HH:mm"
) => {
  const formattedDate = parseDate(date);
  return formatInTimeZone(formattedDate, timeZone, timeFormat);
};

export const formatNumber = (number: string | number) => {
  return Number(number).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const parseDate = (date: Date | string) => {
  return typeof date === "string" ? parseISO(date) : date;
};

export const startOfDate = (date: Date | string) => {
  let formattedDate = parseDate(date);
  formattedDate = set(formattedDate, { year: 1970, month: 0, date: 1 });
  return formattedDate;
};

export const getParamValue = (pair: string) => {
  return pair.split("=")[1];
};

export const getObjectTotal = (object: { [key: string]: number }) => {
  return Object.values(object).reduce((acc, value) => acc + value, 0);
};
