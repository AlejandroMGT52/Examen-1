// src/cursos/excepciones/curso-validation.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class CursoValidationException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
