import { Employee } from "@/types/globals";

export const formatNumber = (number: string | number) => {
  return Number(number).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
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
