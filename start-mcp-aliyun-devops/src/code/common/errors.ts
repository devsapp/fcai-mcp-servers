export class YunxiaoError extends Error {
  constructor(
      message: string,
      public readonly status: number,
      public readonly response: unknown
  ) {
    super(message);
    this.name = "YunxiaoError";
  }
}

export class YunxiaoValidationError extends YunxiaoError {
  constructor(message: string, status: number, response: unknown) {
    super(message, status, response);
    this.name = "YunxiaoValidationError";
  }
}

export class YunxiaoResourceNotFoundError extends YunxiaoError {
  constructor(resource: string) {
    super(`Resource not found: ${resource}`, 404, { message: `${resource} not found` });
    this.name = "YunxiaoResourceNotFoundError";
  }
}

export class YunxiaoAuthenticationError extends YunxiaoError {
  constructor(message = "Authentication failed") {
    super(message, 401, { message });
    this.name = "YunxiaoAuthenticationError";
  }
}

export class YunxiaoPermissionError extends YunxiaoError {
  constructor(message = "Insufficient permissions") {
    super(message, 403, { message });
    this.name = "YunxiaoPermissionError";
  }
}

export class YunxiaoRateLimitError extends YunxiaoError {
  constructor(
      message = "Rate limit exceeded",
      public readonly resetAt: Date
  ) {
    super(message, 429, { message, reset_at: resetAt.toISOString() });
    this.name = "YunxiaoRateLimitError";
  }
}

export class YunxiaoConflictError extends YunxiaoError {
  constructor(message: string) {
    super(message, 409, { message });
    this.name = "YunxiaoConflictError";
  }
}

export function isYunxiaoError(error: unknown): error is YunxiaoError {
  return error instanceof YunxiaoError;
}

export function createYunxiaoError(status: number, response: any): YunxiaoError {
  switch (status) {
    case 401:
      return new YunxiaoAuthenticationError(response?.message);
    case 403:
      return new YunxiaoPermissionError(response?.message);
    case 404:
      return new YunxiaoResourceNotFoundError(response?.message || "Resource");
    case 409:
      return new YunxiaoConflictError(response?.message || "Conflict occurred");
    case 422:
      return new YunxiaoValidationError(
          response?.message || "Validation failed",
          status,
          response
      );
    case 429:
      return new YunxiaoRateLimitError(
          response?.message,
          new Date(response?.reset_at || Date.now() + 60000)
      );
    default:
      return new YunxiaoError(
          response?.message || "Yunxiao API error",
          status,
          response
      );
  }
}