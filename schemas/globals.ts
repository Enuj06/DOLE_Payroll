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
});

export type Employee = Yup.InferType<typeof employee>;
