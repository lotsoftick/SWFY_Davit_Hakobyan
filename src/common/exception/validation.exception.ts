import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../enum/error.code';
import { ValidationError } from 'class-validator';

export class ValidationException extends HttpException {
  constructor(errors: ValidationError[]) {
    super(
      {
        message: 'Validation error',
        code: ErrorCode.FAILURE,
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        alerts: errors.map((error) => ({
          name: error.property,
          message: Object.values(error.constraints)[0],
        })),
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
