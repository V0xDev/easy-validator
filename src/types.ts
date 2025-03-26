import { ValidationEasyError } from "./error";

export type EasyErrorCode = "invalid_type" | "invalid_length" | "custom_error";
export type EasyType =
  | "string"
  | "number"
  | "bigint"
  | "boolean"
  | "symbol"
  | "object"
  | "undefined"
  | "function";

export interface EasyError {
  code: EasyErrorCode;
  message: string;
  expected?: EasyType;
  received?: EasyType;
}

export type EasyNewMessageParams = EasyError | string;
export type EasyMessageLengthComparison = "less" | "greater";

export type EasyLiteValidation = EasyError[];
export type EasyValidation = null | ValidationEasyError;

export interface ChainValidator {
  min(length?: number, params?: EasyNewMessageParams): ChainValidator;
  max(length?: number, params?: EasyNewMessageParams): ChainValidator;
  rule(rule: () => EasyError | null): ChainValidator;
  liteValidate(): EasyLiteValidation;
  validate(): EasyValidation;
}
