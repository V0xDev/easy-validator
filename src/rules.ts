import {
  EasyError,
  EasyMessageLengthComparison,
  EasyNewMessageParams,
  EasyType,
} from "./types";
import { createError, createLengthError, getLength } from "./utils";

export function checkType(value: any, eType: EasyType): EasyError | null {
  if (typeof value !== eType) {
    const error: EasyError = {
      code: "invalid_type",
      message: `value '${value}' is not a ${eType}`,
      expected: typeof value,
      received: eType,
    };
    return error;
  }
  return null;
}

export function checkLength(
  comparison: EasyMessageLengthComparison,
  value: string | number,
  threshold: number,
  params?: EasyNewMessageParams
): EasyError | null {
  const length = getLength(value);

  const conditions: Record<EasyMessageLengthComparison, boolean> = {
    less: length < threshold,
    greater: length > threshold,
  };

  if (conditions[comparison]) {
    const defaultError = createLengthError(value, threshold, comparison);
    return createError(defaultError, params);
  }
  return null;
}
