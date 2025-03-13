import { ev } from "./validator";

export type EasyErrorCode = "invalid_type" | "invalid_length";
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

export interface ChainValidator {
  min(length?: number, params?: EasyNewMessageParams): ChainValidator;
  max(length?: number, params?: EasyNewMessageParams): ChainValidator;
  liteValidate(): EasyError[];
}
