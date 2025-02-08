import { Estudiante } from '../../../core/domain/estudiante';
import { Curso } from '../../../core/domain/curso';
import { Calificacion } from '../../../core/domain/calificacion';
import { Boletin } from '../../../core/domain/boletin';
import { Matricula } from '../../../core/domain/matricula';
import { Asignatura } from '../../../core/domain/asignatura';

import { EstudianteRepository } from '../../../core/ports/EstudianteRepository';
import { CursoRepository } from '../../../core/ports/CursoRepository';
import { CalificacionRepository } from '../../../core/ports/CalificacionRepository';
import { BoletinRepository } from '../../../core/ports/BoletinRepository';
import { MatriculaRepository } from '../../../core/ports/MatriculaRepository';
import { AsignaturaRepository } from '../../../core/ports/AsignaturaRepository';

export const resolvers = {
  Query: {
    estudiantes: async (_: unknown, __: unknown, { repositories }: any) => {
      return await repositories.estudianteRepository.findAll();
    },
    estudiante: async (_: unknown, { id }: any, { repositories }: any) => {
      return await repositories.estudianteRepository.findById(id);
    },

    cursos: async (_: unknown, __: unknown, { repositories }: any) => {
      return await repositories.cursoRepository.findAll();
    },
    curso: async (_: unknown, { id }: any, { repositories }: any) => {
      return await repositories.cursoRepository.findById(id);
    },

    calificaciones: async (_: unknown, __: unknown, { repositories }: any) => {
      return await repositories.calificacionRepository.findAll();
    },
    calificacion: async (_: unknown, { id }: any, { repositories }: any) => {
      return await repositories.calificacionRepository.findById(id);
    },
    calificacionesPorEstudiante: async (_: unknown, { estudianteId }: any, { repositories }: any) => {
      return await repositories.calificacionRepository.findByEstudianteId(estudianteId);
    },
    

    boletines: async (_: unknown, __: unknown, { repositories }: any) => {
      return await repositories.boletinRepository.findAll();
    },
    boletin: async (_: unknown, { id }: any, { repositories }: any) => {
      return await repositories.boletinRepository.findById(id);
    },
    boletinesPorEstudiante: async (_: unknown, { estudianteId }: any, { repositories }: any) => {
      return await repositories.boletinRepository.findByEstudianteId(estudianteId);
    },

    matriculas: async (_: unknown, __: unknown, { repositories }: any) => {
      return await repositories.matriculaRepository.findAll();
    },
    matricula: async (_: unknown, { id }: any, { repositories }: any) => {
      return await repositories.matriculaRepository.findById(id);
    },
    matriculasPorEstudiante: async (_: unknown, { estudianteId }: any, { repositories }: any) => {
      return await repositories.matriculaRepository.findByEstudianteId(estudianteId);
    },
    
    asignaturas: async (_: unknown, __: unknown, { repositories }: any) => {
      return await repositories.asignaturaRepository.findAll();
    },
    asignatura: async (_: unknown, { id }: any, { repositories }: any) => {
     return await repositories.asignaturaRepository.findById(id);
    },
  },

  Mutation: {
    crearEstudiante: async (_: unknown, { input }: any, { repositories }: any) => {
      return await repositories.estudianteRepository.create(input);
    },
    actualizarEstudiante: async (_: unknown, { id, input }: any, { repositories }: any) => {
      return await repositories.estudianteRepository.update(id, input);
    },
    eliminarEstudiante: async (_: unknown, { id }: any, { repositories }: any) => {
      return await repositories.estudianteRepository.delete(id);
    },

    crearCurso: async (_: unknown, { input }: any, { repositories }: any) => {
      return await repositories.cursoRepository.create(input);
    },
    actualizarCurso: async (_: unknown, { id, input }: any, { repositories }: any) => {
      return await repositories.cursoRepository.update(id, input);
    },
    eliminarCurso: async (_: unknown, { id }: any, { repositories }: any) => {
      return await repositories.cursoRepository.delete(id);
    },

    crearCalificacion: async (_: unknown, { input }: any, { repositories }: any) => {
      return await repositories.calificacionRepository.create(input);
    },
    actualizarCalificacion: async (_: unknown, { id, input }: any, { repositories }: any) => {
      return await repositories.calificacionRepository.update(id, input);
    },
    eliminarCalificacion: async (_: unknown, { id }: any, { repositories }: any) => {
      return await repositories.calificacionRepository.delete(id);
    },

    generarBoletin: async (_: unknown, { input }: any, { repositories }: any) => {
      const estudiante = await repositories.estudianteRepository.findById(input.estudianteId);
      const calificaciones = await repositories.calificacionRepository.findByEstudianteIdAndPeriodo(
        input.estudianteId,
        input.periodo
      );
      
      const promedio = calificaciones.reduce((acc: number, cal: Calificacion) => acc + cal.calificacion, 0) / calificaciones.length;
      
      return await repositories.boletinRepository.create({
        ...input,
        calificaciones,
        promedio,
        fechaGeneracion: new Date().toISOString(),
      });
    },
    actualizarBoletin: async (_: unknown, { id, input }: any, { repositories }: any) => {
      return await repositories.boletinRepository.update(id, input);
    },
    eliminarBoletin: async (_: unknown, { id }: any, { repositories }: any) => {
      return await repositories.boletinRepository.delete(id);
    },

    crearMatricula: async (_: unknown, { input }: any, { repositories }: any) => {
      return await repositories.matriculaRepository.create({
        ...input,
        fechaMatricula: new Date().toISOString(),
      });
    },
    actualizarEstadoMatricula: async (_: unknown, { id, estado }: any, { repositories }: any) => {
      return await repositories.matriculaRepository.updateEstado(id, estado);
    },
    eliminarMatricula: async (_: unknown, { id }: any, { repositories }: any) => {
      return await repositories.matriculaRepository.delete(id);
    },

    crearAsignatura: async (_: unknown, { input }: any, { repositories }: any) => {
      return await repositories.asignaturaRepository.create(input);
    },
    actualizarAsignatura: async (_: unknown, { id, input }: any, { repositories }: any) => {
      return await repositories.asignaturaRepository.update(id, input);
    },
    eliminarAsignatura: async (_: unknown, { id }: any, { repositories }: any) => {
      return await repositories.asignaturaRepository.delete(id);
    },
  },

  Estudiante: {
    matriculas: async (estudiante: any, _: unknown, { repositories }: any) => {
      return await repositories.matriculaRepository.findByEstudianteId(estudiante.id);
    },
    calificaciones: async (estudiante: any, _: unknown, { repositories }: any) => {
      return await repositories.calificacionRepository.findByEstudianteId(estudiante.id);
    },
    boletines: async (estudiante: any, _: unknown, { repositories }: any) => {
      return await repositories.boletinRepository.findByEstudianteId(estudiante.id);
    },
    asignaturas: async (estudiante: any, _: unknown, { repositories }: any) => {
      return await repositories.asignaturaRepository.findByEstudianteId(estudiante.id);
    },
  },

  Curso: {
    matriculas: async (curso: any, _: unknown, { repositories }: any) => {
      return await repositories.matriculaRepository.findByCursoId(curso.id);
    },
  },

  Calificacion: {
    estudiante: async (calificacion: any, _: unknown, { repositories }: any) => {
      return await repositories.estudianteRepository.findById(calificacion.estudianteId);
    },
    
  },

  Boletin: {
    estudiante: async (boletin: any, _: unknown, { repositories }: any) => {
      return await repositories.estudianteRepository.findById(boletin.estudianteId);
    },
    calificaciones: async (boletin: any, _: unknown, { repositories }: any) => {
      return await repositories.calificacionRepository.findByBoletinId(boletin.id);
    },
  },

  Matricula: {
    estudiante: async (matricula: any, _: unknown, { repositories }: any) => {
      return await repositories.estudianteRepository.findById(matricula.estudianteId);
    },
    curso: async (matricula: any, _: unknown, { repositories }: any) => {
      return await repositories.cursoRepository.findById(matricula.cursoId);
    },
    asignaturas: async (matricula: any, _: unknown, { repositories }: any) => {
      return await repositories.asignaturaRepository.findByMatriculaId(matricula.id);
    },
  },  

  Asignatura: {
    estudiantes: async (matricula: any, _: unknown, { repositories }: any) => {
      return await repositories.estudianteRepository.findById(matricula.estudianteId);
    },
    calificaciones: async (matricula: any, _: unknown, { repositories }: any) => {
      return await repositories.calificacionRepository.findByMatriculaId(matricula.id);
    },
    boletines: async (matricula: any, _: unknown, { repositories }: any) => {
      return await repositories.boletinRepository.findByMatriculaId(matricula.id);
    },
    matriculas : async (matricula: any, _: unknown, { repositories }: any) => {
      return await repositories.matriculaRepository.findById(matricula.id);
    },
  },
};