import { differenceInDays } from "date-fns";
import * as Yup from "yup";

export const period = Yup.object().shape({
  start: Yup.date()
    .typeError("Start must be a valid date")
    .required()
    .label("Start"),
  end: Yup.date()
    .typeError("End must be a valid date")
    .required()
    .test(
      "isBefore",
      "End must be after Start",
      (value, context) => differenceInDays(value, context.parent.start) >= 0
    )
    .label("End"),
});

export type Period = Yup.InferType<typeof period>;

export const attendance = Yup.object().shape({
  date: Yup.date()
    .typeError("Date must be a valid date")
    .required()
    .label("Date"),
  am_in: Yup.date().typeError("AM In must be a valid date").label("AM In"),
  am_out: Yup.date().typeError("AM Out must be a valid date").label("AM Out"),
  pm_in: Yup.date().typeError("PM In must be a valid date").label("PM In"),
  pm_out: Yup.date().typeError("PM Out must be a valid date").label("PM Out"),
  ot_in: Yup.date().typeError("OT In must be a valid date").label("OT In"),
  ot_out: Yup.date().typeError("OT Out must be a valid date").label("AM Out"),
  employee_id: Yup.number()
    .typeError("Employee ID must be a number")
    .required()
    .label("Employee"),
});

export type Attendance = Yup.InferType<typeof attendance>;

export const employee = Yup.object().shape({
  last_name: Yup.string().trim().required().label("Last Name"),
  first_name: Yup.string().trim().required().label("First Name"),
  middle_initial: Yup.string()
    .trim()
    .required()
    .test(
      "isCorrectFormat",
      "Middle Initial must be in the correct format",
      (value) => {
        return (
          ["na", "n/a"].includes(value.toLowerCase()) || value.length === 1
        );
      }
    )
    .label("Middle Initial"),
  position: Yup.string().trim().required().label("Position"),
  rate: Yup.number()
    .typeError("Rate must be a number")
    .required()
    .label("Rate"),
  schedule_id: Yup.number()
    .typeError("Schedule ID must be a number")
    .required()
    .label("Schedule"),
});

export type Employee = Yup.InferType<typeof employee>;

export const schedule = Yup.object().shape({
  am_in: Yup.date()
    .typeError("AM In must be a valid date")
    .required()
    .label("AM In"),
  am_out: Yup.date()
    .typeError("AM Out must be a valid date")
    .required()
    .label("AM Out"),
  pm_in: Yup.date()
    .typeError("PM In must be a valid date")
    .required()
    .label("PM In"),
  pm_out: Yup.date()
    .typeError("PM Out must be a valid date")
    .required()
    .label("PM Out"),
});

export type Schedule = Yup.InferType<typeof schedule>;

export const claim = Yup.object().shape({
  reason: Yup.string().trim().required().label("Reason"),
  date: Yup.date()
    .typeError("Date must be a valid date")
    .required()
    .label("Date"),
  amount: Yup.number()
    .typeError("Amount must be a number")
    .required()
    .label("Amount"),
  employee_id: Yup.number()
    .typeError("Employee ID must be a number")
    .required()
    .label("Employee"),
});

export type Claim = Yup.InferType<typeof claim>;

export const advance = Yup.object().shape({
  reason: Yup.string().trim().required().label("Reason"),
  date: Yup.date()
    .typeError("Date must be a valid date")
    .required()
    .label("Date"),
  amount: Yup.number()
    .typeError("Amount must be a number")
    .required()
    .label("Amount"),
  employee_id: Yup.number()
    .typeError("Employee ID must be a number")
    .required()
    .label("Employee"),
});

export type Advance = Yup.InferType<typeof advance>;
