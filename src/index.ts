import { EasyError } from "./types";
import { ev } from "./validator";

// const valNumber: number = 6;
// const valBool: boolean = false;
const valString: string = "строка";

const validator = ev(valString)
  .string()
  .min(3)
  .max(6, "Строка слишком длинная!")
  .rule(() => {
    if ("str" === "str") {
      return { code: "custom_error", message: "Строки равны" } as EasyError;
    }

    return null;
  })
  .rule(() => {
    if (10 > 6) {
      return { code: "custom_error", message: "10 больше 6" } as EasyError;
    }

    return null;
  });

console.log(validator.liteValidate());
console.log("next check");
