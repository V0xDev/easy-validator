import {
  EasyError,
  EasyMessageLengthComparison,
  EasyNewMessageParams,
} from "./types";

export function createError(
  defaultError: EasyError,
  params?: EasyNewMessageParams
) {
  if (typeof params === "string") {
    return {
      ...defaultError,
      message: params,
    };
  }

  if (params && typeof params === "object") {
    return {
      ...defaultError,
      ...params,
    };
  }

  return defaultError;
}

export function createLengthError(
  value: string | number,
  limit: number,
  comparison: EasyMessageLengthComparison
): EasyError {
  const message: Record<"less" | "greater", string> = {
    less: `Length of '${value}' is less than ${limit}`,
    greater: `Length of '${value}' is greater than ${limit}`,
  };

  return {
    code: "invalid_length",
    message: message[comparison],
  };
}

export function getLength(value: string | number): number {
  return typeof value === "string" ? value.length : value;
}
