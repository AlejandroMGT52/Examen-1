// src/cursos/cursos.module.ts
import { Module } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';

@Module({
  imports: [],
  controllers: [CursosController],
  providers: [CursosService],
})
export class CursosModule {}
