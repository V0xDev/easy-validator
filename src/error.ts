import { EasyError } from "./types";

export class ValidationEasyError extends Error {
  public readonly error: EasyError;

  constructor(error: EasyError) {
    super(error.message);
    this.error = error;
  }
}
