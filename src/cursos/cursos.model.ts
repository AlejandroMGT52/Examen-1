// src/cursos/cursos.model.ts
export interface Curso {
    id: string;
    titulo: string;
    descripcion: string;
    instructorId: string;
    categoria: string;
    duracion: number;
    precio: number;
    capacidad: number;
    inscritos: number;
    estado: 'borrador' | 'publicado' | 'en_curso' | 'finalizado';
    fechaInicio: Date;
  }
  