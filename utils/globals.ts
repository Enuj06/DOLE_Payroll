import * as schema from "@/db/schema";
import {
  Advance,
  Attendance,
  Claim,
  Employee,
  Schedule,
} from "@/types/globals";
import holidaysJSON from "@/utils/holidays.json";
import {
  differenceInSeconds,
  eachDayOfInterval,
  format,
  getYear,
  parseISO,
  set,
} from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";

export const toastVisibilityTime = 2000;

export const getDb = (sqlDb: SQLiteDatabase) => {
  return drizzle(sqlDb, { schema });
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
  timeFormat: string = "HH:mm"
) => {
  const formattedDate = parseDate(date);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
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

export const getEstimates = (start: Date | string, end: Date | string) => {
  let days = { working: 0, rest: 0, special: 0, holiday: 0 };

  const formattedStart = new Date(formatDate(start));
  const formattedEnd = new Date(formatDate(end));
  const workDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const dates = eachDayOfInterval({
    start: formattedStart,
    end: formattedEnd,
  });

  dates.forEach((date) => {
    const formattedDate = new Date(formatDate(date));
    const year = getYear(formattedDate);
    const yearHolidays = holidaysJSON[`${year}` as keyof typeof holidaysJSON];

    workDays.includes(format(formattedDate, "EEEE")) && ++days.working;
    days.rest = dates.length - days.working;

    if (yearHolidays) {
      const holiday = yearHolidays.find((holiday) => {
        const holidayDate = new Date(holiday.date);
        return formattedDate.valueOf() === holidayDate.valueOf();
      });

      if (holiday) {
        holiday.type === "Special (Non-Working) Holiday" && ++days.special;
        holiday.type === "Regular Holiday" && ++days.holiday;
      }
    }
  });

  return days;
};

export const getTimeDifference = (
  date1: Date | string,
  date2: Date | string
) => {
  const formattedDate1 = parseDate(date1);
  const formattedDate2 = parseDate(date2);

  const seconds = differenceInSeconds(formattedDate1, formattedDate2);
  return seconds / 60 / 60;
};

export const getDayHours = (
  scheduleIn: Date | string,
  scheduleOut: Date | string,
  timeIn: Date | string,
  timeOut: Date | string
) => {
  const formattedScheduleIn = parseDate(scheduleIn);
  const formattedScheduleOut = parseDate(scheduleOut);

  let formattedTimeIn = parseDate(timeIn);
  let formattedTimeOut = parseDate(timeOut);

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

export const getWorkingHours = (start: Date | string, end: Date | string) => {
  let days = 0;
  const formattedStart = parseDate(start);
  const formattedEnd = parseDate(end);

  const dates = eachDayOfInterval({
    start: formattedStart,
    end: formattedEnd,
  });

  const workDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  dates.forEach((date) => {
    workDays.includes(format(date, "EEEE")) && ++days;
  });

  return days * 8;
};

export const getBasicPay = (
  rate: number,
  schedule: Schedule,
  attendances: Attendance[]
) => {
  const hours =
    schedule && attendances ? getPeriodHours(schedule, attendances) : 0;
  return (rate / 8) * hours;
};

export const getClaims = (
  start: Date | string,
  end: Date | string,
  claims: Claim[]
) => {
  let amount = 0;
  const formattedStart = new Date(formatDate(start));
  const formattedEnd = new Date(formatDate(end));

  claims.forEach((claim) => {
    const date = new Date(formatDate(claim.date));
    if (
      date.valueOf() >= formattedStart.valueOf() &&
      date.valueOf() <= formattedEnd.valueOf()
    ) {
      amount += claim.amount;
    }
  });

  return amount;
};

export const getOTHours = (
  start: Date | string,
  end: Date | string,
  attendances: Attendance[]
) => {
  let hours = 0;
  const formattedStart = new Date(formatDate(start));
  const formattedEnd = new Date(formatDate(end));

  attendances.forEach((attendance) => {
    const date = new Date(formatDate(attendance.date));

    if (
      attendance.ot_in &&
      attendance.ot_out &&
      date.valueOf() >= formattedStart.valueOf() &&
      date.valueOf() <= formattedEnd.valueOf()
    ) {
      hours += getTimeDifference(attendance.ot_out, attendance.ot_in);
    }
  });

  return hours;
};

export const getOTPay = (rate: number, hours: number) => {
  const amount = (rate / 8) * 0.25 * hours;
  return amount;
};

export const getEarnings = (
  start: Date | string,
  end: Date | string,
  employee: Employee
) => {
  let earnings = { basic: 0, claims: 0, ot: 0 };

  if (employee.schedule && employee.attendances) {
    earnings.basic = getBasicPay(
      employee.rate,
      employee.schedule,
      employee.attendances
    );
  }

  if (employee.claims) {
    earnings.claims = getClaims(start, end, employee.claims);
  }

  if (employee.attendances) {
    const otHours = getOTHours(start, end, employee.attendances);
    earnings.ot = getOTPay(employee.rate, otHours);
  }

  return earnings;
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

export const getAdvances = (
  start: Date | string,
  end: Date | string,
  advances: Advance[]
) => {
  let amount = 0;
  const formattedStart = new Date(formatDate(start));
  const formattedEnd = new Date(formatDate(end));

  advances.forEach((advance) => {
    const date = new Date(formatDate(advance.date));
    if (
      date.valueOf() >= formattedStart.valueOf() &&
      date.valueOf() <= formattedEnd.valueOf()
    ) {
      amount += advance.amount;
    }
  });

  return amount;
};

export const getDeductions = (
  start: Date | string,
  end: Date | string,
  employee: Employee
) => {
  let deductions = { sss: 0, hdmf: 0, phic: 0, advances: 0 };

  deductions.sss = getSSSContribution(employee.rate);
  deductions.hdmf = getHDMFContribution(employee.rate);
  deductions.phic = getPHICContribution(employee.rate);
  deductions.advances = employee.advances
    ? getAdvances(start, end, employee.advances)
    : 0;

  return deductions;
};
