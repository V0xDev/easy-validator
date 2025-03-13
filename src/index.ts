import { ev } from "./validator";

// const valNumber: number = 6;
// const valBool: boolean = false;
const valString: string = "строк";

const validator = ev(valString)
  .string()
  .min(3)
  .max(5, "Строка слишком длинная!");

console.log(validator.liteValidate());
