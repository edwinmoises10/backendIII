export class CustomError extends Error {
  constructor(code, message, statusCode) {
    super(message);
    this.name = "CustomError";
    this.code = code;
    this.statusCode = statusCode;
  }
}
