export const resolvers = {
  Query: {
    // Resolvers de Estudiantes
    estudiantes: async (_, __, { dataSources }) => {
      return await dataSources.estudiantesAPI.getEstudiantes();
    },
    estudiante: async (_, { id }, { dataSources }) => {
      return await dataSources.estudiantesAPI.getEstudianteById(id);
    },

    // Resolvers de Cursos
    cursos: async (_, __, { dataSources }) => {
      return await dataSources.cursosAPI.getCursos();
    },
    curso: async (_, { id }, { dataSources }) => {
      return await dataSources.cursosAPI.getCursoById(id);
    },

    // Resolvers de Calificaciones
    calificaciones: async (_, __, { dataSources }) => {
      return await dataSources.calificacionesAPI.getCalificaciones();
    },
    calificacionesPorEstudiante: async (_, { estudianteId }, { dataSources }) => {
      return await dataSources.calificacionesAPI.getCalificacionesByEstudianteId(estudianteId);
    },
    calificacionesPorCurso: async (_, { cursoId }, { dataSources }) => {
      return await dataSources.calificacionesAPI.getCalificacionesByCursoId(cursoId);
    },

    // Resolvers de Boletines
    boletines: async (_, __, { dataSources }) => {
      return await dataSources.boletinesAPI.getBoletines();
    },
    boletinPorEstudiante: async (_, { estudianteId }, { dataSources }) => {
      return await dataSources.boletinesAPI.getBoletinByEstudianteId(estudianteId);
    },

    // Resolvers de Matrículas
    matriculas: async (_, __, { dataSources }) => {
      return await dataSources.matriculasAPI.getMatriculas();
    },
    matriculasPorEstudiante: async (_, { estudianteId }, { dataSources }) => {
      return await dataSources.matriculasAPI.getMatriculasByEstudianteId(estudianteId);
    },
    matriculasPorCurso: async (_, { cursoId }, { dataSources }) => {
      return await dataSources.matriculasAPI.getMatriculasByCursoId(cursoId);
    },
  },

  Mutation: {
    // Mutations de Estudiantes
    crearEstudiante: async (_, { nombre, apellido, email, telefono, direccion }, { dataSources }) => {
      return await dataSources.estudiantesAPI.createEstudiante({
        nombre,
        apellido,
        email,
        telefono,
        direccion,
      });
    },
    actualizarEstudiante: async (_, { id, ...datos }, { dataSources }) => {
      return await dataSources.estudiantesAPI.updateEstudiante(id, datos);
    },
    eliminarEstudiante: async (_, { id }, { dataSources }) => {
      return await dataSources.estudiantesAPI.deleteEstudiante(id);
    },

    // Mutations de Cursos
    crearCurso: async (_, { nombre, profesor }, { dataSources }) => {
      return await dataSources.cursosAPI.createCurso({ nombre, profesor });
    },
    actualizarCurso: async (_, { id, ...datos }, { dataSources }) => {
      return await dataSources.cursosAPI.updateCurso(id, datos);
    },
    eliminarCurso: async (_, { id }, { dataSources }) => {
      return await dataSources.cursosAPI.deleteCurso(id);
    },

    // Mutations de Calificaciones
    crearCalificacion: async (_, { estudianteId, cursoId, calificacion, periodo }, { dataSources }) => {
      return await dataSources.calificacionesAPI.createCalificacion({
        estudianteId,
        cursoId,
        calificacion,
        periodo,
      });
    },
    actualizarCalificacion: async (_, { id, ...datos }, { dataSources }) => {
      return await dataSources.calificacionesAPI.updateCalificacion(id, datos);
    },
    eliminarCalificacion: async (_, { id }, { dataSources }) => {
      return await dataSources.calificacionesAPI.deleteCalificacion(id);
    },

    // Mutations de Matrículas
    crearMatricula: async (_, { estudianteId, cursoId, matriculaFecha }, { dataSources }) => {
      return await dataSources.matriculasAPI.createMatricula({
        estudianteId,
        cursoId,
        matriculaFecha,
      });
    },
    eliminarMatricula: async (_, { id }, { dataSources }) => {
      return await dataSources.matriculasAPI.deleteMatricula(id);
    },
  },

  // Resolvers_campos relacionados
  Boletin: {
    estudiante: async (parent, _, { dataSources }) => {
      return await dataSources.estudiantesAPI.getEstudianteById(parent.estudianteId);
    },
    curso: async (parent, _, { dataSources }) => {
      return await dataSources.cursosAPI.getCursoById(parent.cursoId);
    },
    calificaciones: async (parent, _, { dataSources }) => {
      return await dataSources.calificacionesAPI.getCalificacionesByBoletinId(parent.id);
    },
  },

  Matricula: {
    estudiante: async (parent, _, { dataSources }) => {
      return await dataSources.estudiantesAPI.getEstudianteById(parent.estudianteId);
    },
    curso: async (parent, _, { dataSources }) => {
      return await dataSources.cursosAPI.getCursoById(parent.cursoId);
    },
  },

  Calificacion: {
    estudiante: async (parent, _, { dataSources }) => {
      return await dataSources.estudiantesAPI.getEstudianteById(parent.estudianteId);
    },
    curso: async (parent, _, { dataSources }) => {
      return await dataSources.cursosAPI.getCursoById(parent.cursoId);
    },
  },
};