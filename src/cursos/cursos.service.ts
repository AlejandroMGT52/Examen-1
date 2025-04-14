import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { Curso } from './cursos.model';

@Injectable()
export class CursosService {
  private cursos: Curso[] = [];

  // Obtener todos los cursos
  getAllCursos(): Curso[] {
    return this.cursos;
  }

  // Filtrar cursos por categoría
  getCursosByCategoria(categoria: string): Curso[] {
    return this.cursos.filter(curso => curso.categoria === categoria);
  }

  // Filtrar cursos por estado
  getCursosByEstado(estado: string): Curso[] {
    return this.cursos.filter(curso => curso.estado === estado);
  }

  // Obtener un curso por ID
  getCursoById(id: string): Curso {
    const curso = this.cursos.find(curso => curso.id === id);
    if (!curso) {
      throw new NotFoundException(`Curso con ID ${id} no encontrado`);
    }
    return curso;
  }

  // Crear un nuevo curso
  createCurso(curso: Curso): Curso {
    // Verificar si el curso con el mismo ID ya existe
    const cursoExistente = this.cursos.find(c => c.id === curso.id);
    if (cursoExistente) {
      throw new ConflictException('Este curso ya existe');
    }

    // Validar que los datos del curso sean correctos
    if (curso.titulo.length < 5 || curso.descripcion.length < 20) {
      throw new BadRequestException('Datos de curso inválidos');
    }

    // Si pasa la validación, agrega el curso
    this.cursos.push(curso);
    return curso;
  }

  // Actualizar información de un curso
  updateCurso(id: string, updatedCurso: Partial<Curso>): Curso {
    const cursoIndex = this.cursos.findIndex(curso => curso.id === id);
    if (cursoIndex === -1) {
      throw new NotFoundException(`Curso con ID ${id} no encontrado`);
    }
    this.cursos[cursoIndex] = { ...this.cursos[cursoIndex], ...updatedCurso };
    return this.cursos[cursoIndex];
  }

  // Cambiar el estado de un curso
  cambiarEstadoCurso(id: string, estado: 'borrador' | 'publicado' | 'en_curso' | 'finalizado'): Curso {
    const curso = this.getCursoById(id);
    curso.estado = estado;
    return curso;
  }

  // Inscribir a un estudiante en un curso
  inscribirEstudiante(id: string): Curso {
    const curso = this.getCursoById(id);
    if (curso.inscritos >= curso.capacidad) {
      throw new ConflictException('El curso ya está completo');
    }
    curso.inscritos++;
    return curso;
  }
}
