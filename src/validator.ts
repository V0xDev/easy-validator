import { ValidationEasyError } from "./error";
import { checkLength, checkType } from "./rules";
import type {
  ChainValidator,
  EasyError,
  EasyNewMessageParams,
  EasyType,
} from "./types";

function easyValidator(value: any) {
  const errors: EasyError[] = [];

  function addError(checkFunc: () => EasyError | null): void {
    const error = checkFunc();
    if (error !== null) {
      errors.push(error);
    }
  }

  function addBaseChain(type: EasyType): ChainValidator {
    addError(() => checkType(value, type));

    return {
      min(length = 1, params?: EasyNewMessageParams) {
        addError(() => checkLength("less", value, length, params));
        return this;
      },
      max(length = 1, params?: EasyNewMessageParams) {
        addError(() => checkLength("greater", value, length, params));
        return this;
      },
      rule(rule: () => EasyError | null) {
        addError(rule);
        return this;
      },
      liteValidate,
      validate,
    };
  }

  function createLimitedChain(
    type: EasyType
  ): Omit<ChainValidator, "min" | "max"> {
    const chain = addBaseChain(type);
    const { min, max, ...rest } = chain;
    return rest;
  }

  function liteValidate() {
    return errors;
  }

  function validate() {
    if (errors.length > 0) {
      throw new ValidationEasyError(errors[0]);
    }
    return null;
  }

  const validateFunc = {
    string: () => addBaseChain("string"),
    number: () => addBaseChain("number"),
    bigint: () => addBaseChain("number"),
    boolean: () => createLimitedChain("boolean"),
    symbol: () => createLimitedChain("symbol"),
    object: () => createLimitedChain("object"),
  };

  return validateFunc;
}

export { easyValidator as ev };
