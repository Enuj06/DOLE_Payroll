import * as schema from "@/db/schema";
import { differenceInSeconds, format, set } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";

export type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export const getDb = (sqlDb: SQLiteDatabase) => {
  return drizzle(sqlDb, { schema });
};

export const getDate = (date: Date | string) => {
  const formattedDate = typeof date === "string" ? new Date(date) : date;
  return format(formattedDate, "yyyy-MM-dd");
};

export const getTime = (date: Date | string) => {
  const formattedDate = typeof date === "string" ? new Date(date) : date;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return formatInTimeZone(formattedDate, timeZone, "HH:mm");
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
  scheduleIn: Date | string,
  scheduleOut: Date | string,
  timeIn: Date | string,
  timeOut: Date | string
) => {
  const formattedScheduleIn =
    typeof scheduleIn === "string" ? new Date(scheduleIn) : scheduleIn;
  const formattedScheduleOut =
    typeof scheduleOut === "string" ? new Date(scheduleOut) : scheduleOut;

  let formattedTimeIn = typeof timeIn === "string" ? new Date(timeIn) : timeIn;
  let formattedTimeOut =
    typeof timeOut === "string" ? new Date(timeOut) : timeOut;

  const differenceIn = getTimeDifference(formattedTimeIn, formattedScheduleIn);

  if (differenceIn < 0) {
    formattedTimeIn = set(formattedTimeIn, {
      hours: formattedScheduleIn.getHours(),
      minutes: formattedScheduleIn.getMinutes(),
      seconds: formattedScheduleIn.getSeconds(),
    });
  }

  const differenceOut = getTimeDifference(
    formattedTimeOut,
    formattedScheduleOut
  );

  if (differenceOut > 0) {
    formattedTimeOut = set(formattedTimeOut, {
      hours: formattedScheduleOut.getHours(),
      minutes: formattedScheduleOut.getMinutes(),
      seconds: formattedScheduleOut.getSeconds(),
    });
  }

  return getTimeDifference(formattedTimeOut, formattedTimeIn);
};
