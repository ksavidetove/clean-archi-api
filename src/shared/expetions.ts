import { HttpException } from '@nestjs/common';

export enum ErrorCodes {
  BadRequest = 400,
  NotFound = 404,
  InternalServerError = 500,
}

export class MissingEnvironmentVariableError extends HttpException {
  constructor(variableName: string) {
    super(
      `Missing environment variable ${variableName}`,
      ErrorCodes.InternalServerError,
    );
  }
}

export class TeamNotFoundError extends HttpException {
  constructor(id: number[]) {
    super(`Team(s) [ ${id.join(', ')} ] not found`, ErrorCodes.NotFound);
  }
}

export class MemberNotFoundError extends HttpException {
  constructor(id: number[]) {
    super(`Member(s) [ ${id.join(', ')} ] not found`, ErrorCodes.NotFound);
  }
}

export class InternalServerError extends HttpException {
  constructor(message: string, cause?: string) {
    super(message, ErrorCodes.InternalServerError, { cause });
  }
}
