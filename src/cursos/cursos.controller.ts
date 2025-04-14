import {
    Controller,
    Get,
    Post,
    Put,
    Patch,
    Param,
    Body,
    ConflictException,
    NotFoundException,
  } from '@nestjs/common';
  import { CursosService } from './cursos.service';
  import { Curso } from './cursos.model';
  
  type EstadoCurso = 'borrador' | 'publicado' | 'en_curso' | 'finalizado';
  
  @Controller('cursos')
  export class CursosController {
    constructor(private readonly cursosService: CursosService) {}
  
    // 1. Crear un nuevo curso
    @Post()
    crearCurso(@Body() curso: Curso) {
      try {
        const nuevoCurso = this.cursosService.createCurso(curso);
        return {
          mensaje: ' Curso creado exitosamente',
          datos: nuevoCurso,
        };
      } catch (error) {
        if (error instanceof ConflictException) {
          return {
            mensaje: ` Error: ${error.message}`,
            datos: null,
          };
        }
        return {
          mensaje: ' Error desconocido',
          datos: null,
        };
      }
    }
  
    // 2. Obtener todos los cursos
    @Get()
    obtenerTodos() {
      const cursos = this.cursosService.getAllCursos();
      return {
        mensaje: ` Cursos obtenidos correctamente. Total: ${cursos.length}`,
        datos: cursos,
      };
    }
  
    // 3. Obtener un curso por ID
    @Get(':id')
    obtenerPorId(@Param('id') id: string) {
      try {
        const curso = this.cursosService.getCursoById(id);
        return {
          mensaje: ` Curso encontrado con ID ${id}`,
          datos: curso,
        };
      } catch (error) {
        if (error instanceof NotFoundException) {
          return {
            mensaje: ` Error: ${error.message}`,
            datos: null,
          };
        }
        return {
          mensaje: ' Error desconocido',
          datos: null,
        };
      }
    }
  
    // 4. Filtrar cursos por categoría
    @Get('categoria/:categoria')
    filtrarPorCategoria(@Param('categoria') categoria: string) {
      const cursos = this.cursosService.getCursosByCategoria(categoria);
      return {
        mensaje: ` Cursos filtrados por categoría '${categoria}'`,
        datos: cursos,
      };
    }
  
    // 5. Filtrar cursos por estado
    @Get('estado/:estado')
    filtrarPorEstado(@Param('estado') estado: EstadoCurso) {
      const cursos = this.cursosService.getCursosByEstado(estado);
      return {
        mensaje: ` Cursos con estado '${estado}'`,
        datos: cursos,
      };
    }
  
    // 6. Actualizar la información de un curso
    @Put(':id')
    actualizarCurso(@Param('id') id: string, @Body() datos: Partial<Curso>) {
      try {
        const cursoActualizado = this.cursosService.updateCurso(id, datos);
        return {
          mensaje: ` Curso con ID ${id} actualizado correctamente`,
          datos: cursoActualizado,
        };
      } catch (error) {
        if (error instanceof NotFoundException) {
          return {
            mensaje: ` Error: ${error.message}`,
            datos: null,
          };
        }
        return {
          mensaje: ' Error desconocido',
          datos: null,
        };
      }
    }
  
    // 7. Cambiar el estado de un curso
    @Patch(':id/estado')
    cambiarEstado(
      @Param('id') id: string,
      @Body('estado') estado: EstadoCurso,
    ) {
      try {
        const curso = this.cursosService.cambiarEstadoCurso(id, estado);
        return {
          mensaje: ` Estado del curso actualizado a '${estado}'`,
          datos: curso,
        };
      } catch (error) {
        return {
          mensaje: ` Error: ${error.message}`,
          datos: null,
        };
      }
    }
  
    // 8. Inscribir a un estudiante en un curso
    @Post(':id/inscripcion')
    inscribir(@Param('id') id: string) {
      try {
        const curso = this.cursosService.inscribirEstudiante(id);
        return {
          mensaje: ` Estudiante inscrito en el curso con ID ${id}`,
          datos: curso,
        };
      } catch (error) {
        return {
          mensaje: ` Error: ${error.message}`,
          datos: null,
        };
      }
    }
  }
  