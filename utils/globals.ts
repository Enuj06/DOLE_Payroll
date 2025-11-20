import * as schema from "@/db/schema";
import { differenceInSeconds, format, set } from "date-fns";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";

export type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export const getDb = (sqlDb: SQLiteDatabase) => {
  return drizzle(sqlDb, { schema });
};

export const getDate = (date: Date | string) => {
  const formattedDate = typeof date === "string" ? new Date(date) : date;
  return formattedDate.toISOString().split("T")[0];
};

export const getTime = (date: Date | string) => {
  const formattedDate = typeof date === "string" ? new Date(date) : date;
  const time = formattedDate.toLocaleTimeString("en-US", {
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
  date: Date | string,
  dateFormat: string = "MMMM dd, yyyy"
) => {
  const formattedDate = typeof date === "string" ? new Date(date) : date;
  return format(formattedDate, dateFormat);
};

export const getTimeDifference = (
  date1: Date | string,
  date2: Date | string
) => {
  const today = new Date();

  const formattedDate1 = typeof date1 === "string" ? new Date(date1) : date1;
  const date1Set = set(formattedDate1, {
    year: today.getFullYear(),
    month: today.getMonth(),
    date: today.getDate(),
  });

  const formattedDate2 = typeof date2 === "string" ? new Date(date2) : date2;
  const date2Set = set(formattedDate2, {
    year: today.getFullYear(),
    month: today.getMonth(),
    date: today.getDate(),
  });

  const seconds = differenceInSeconds(date1Set, date2Set);
  return seconds / 60 / 60;
};

export const getTotalTime = (
  scheduleIn: string,
  scheduleOut: string,
  timeIn: string,
  timeOut: string
) => {
  const dateScheduleIn = new Date(scheduleIn);
  const dateScheduleOut = new Date(scheduleOut);
  let dateTimeIn = new Date(timeIn);
  let dateTimeOut = new Date(timeOut);

  const inDifference = getTimeDifference(dateTimeIn, dateScheduleIn);

  if (inDifference < 0) {
    dateTimeIn = set(dateTimeIn, {
      hours: dateScheduleIn.getHours(),
      minutes: dateScheduleIn.getMinutes(),
      seconds: dateScheduleIn.getSeconds(),
    });
  }

  const outDifference = getTimeDifference(dateTimeOut, dateScheduleOut);

  if (outDifference > 0) {
    dateTimeOut = set(dateTimeOut, {
      hours: dateScheduleOut.getHours(),
      minutes: dateScheduleOut.getMinutes(),
      seconds: dateScheduleOut.getSeconds(),
    });
  }

  return getTimeDifference(dateTimeOut, dateTimeIn);
};
