import * as schema from "@/db/schema";
import { Attendance, Schedule } from "@/types/globals";
import { differenceInSeconds, format, set } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";

export const toastVisibilityTime = 2000;

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

export const getDayHours = (
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

export const getPeriodHours = (
  schedule: Schedule,
  attendances: Attendance[]
) => {
  let hours = 0;

  if (attendances) {
    attendances.forEach((attendance) => {
      if (
        schedule &&
        attendance.am_in &&
        attendance.am_out &&
        attendance.pm_in &&
        attendance.pm_out
      ) {
        const differenceAM = getDayHours(
          schedule.am_in,
          schedule.am_out,
          attendance.am_in,
          attendance.am_out
        );

        const differencePM = getDayHours(
          schedule.pm_in,
          schedule.pm_out,
          attendance.pm_in,
          attendance.pm_out
        );

        hours += differenceAM + differencePM;
      }
    });
  }

  return hours;
};

export const getGross = (
  schedule: Schedule,
  attendances: Attendance[],
  rate: number
) => {
  const hours =
    schedule && attendances ? getPeriodHours(schedule, attendances) : 0;
  return (rate / 8) * hours;
};

export const getSSSTable = () => {
  const ranges = [];

  let start = 0;
  let amount = 250;

  for (let index = 0; index < 61; ++index) {
    let increase = 500;
    if (index === 0) {
      increase = 5250;
    }

    let end = start + increase - 0.01;
    if (index === 60) {
      end = Infinity;
    }

    ranges.push({ start, end, amount });

    if (start < 19750) {
      amount += 25;
    }
    if (index < 60) {
      start += increase;
    }
  }

  return ranges;
};

export const getSSSContribution = (rate: number) => {
  const monthlyRate = rate * 20;
  const ranges = getSSSTable();
  const range = ranges.find((range) => {
    return monthlyRate >= range.start && monthlyRate <= range.end;
  });
  return range!.amount;
};

export const getHDMFContribution = (rate: number) => {
  const monthlyRate = rate * 20;
  const amount = monthlyRate < 10000 ? monthlyRate * 0.02 : 10000 * 0.02;
  return amount;
};

export const getPHICContribution = (rate: number) => {
  const monthlyRate = rate * 20;
  let amount = 0;
  if (monthlyRate < 10001) {
    amount = 500;
  } else if (monthlyRate > 99999) {
    amount = 5000;
  } else {
    amount = monthlyRate * 0.05;
  }
  return amount / 2;
};
