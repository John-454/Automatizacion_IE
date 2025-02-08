export const resolvers = {
    Query: {
        estudiantes: async (_, __, { repositories }) => {
            return await repositories.estudianteRepository.findAll();
        },
        estudiante: async (_, { id }, { repositories }) => {
            return await repositories.estudianteRepository.findById(id);
        },
        cursos: async (_, __, { repositories }) => {
            return await repositories.cursoRepository.findAll();
        },
        curso: async (_, { id }, { repositories }) => {
            return await repositories.cursoRepository.findById(id);
        },
        calificaciones: async (_, __, { repositories }) => {
            return await repositories.calificacionRepository.findAll();
        },
        calificacion: async (_, { id }, { repositories }) => {
            return await repositories.calificacionRepository.findById(id);
        },
        calificacionesPorEstudiante: async (_, { estudianteId }, { repositories }) => {
            return await repositories.calificacionRepository.findByEstudianteId(estudianteId);
        },
        boletines: async (_, __, { repositories }) => {
            return await repositories.boletinRepository.findAll();
        },
        boletin: async (_, { id }, { repositories }) => {
            return await repositories.boletinRepository.findById(id);
        },
        boletinesPorEstudiante: async (_, { estudianteId }, { repositories }) => {
            return await repositories.boletinRepository.findByEstudianteId(estudianteId);
        },
        matriculas: async (_, __, { repositories }) => {
            return await repositories.matriculaRepository.findAll();
        },
        matricula: async (_, { id }, { repositories }) => {
            return await repositories.matriculaRepository.findById(id);
        },
        matriculasPorEstudiante: async (_, { estudianteId }, { repositories }) => {
            return await repositories.matriculaRepository.findByEstudianteId(estudianteId);
        },
        asignaturas: async (_, __, { repositories }) => {
            return await repositories.asignaturaRepository.findAll();
        },
        asignatura: async (_, { id }, { repositories }) => {
            return await repositories.asignaturaRepository.findById(id);
        },
    },
    Mutation: {
        crearEstudiante: async (_, { input }, { repositories }) => {
            return await repositories.estudianteRepository.create(input);
        },
        actualizarEstudiante: async (_, { id, input }, { repositories }) => {
            return await repositories.estudianteRepository.update(id, input);
        },
        eliminarEstudiante: async (_, { id }, { repositories }) => {
            return await repositories.estudianteRepository.delete(id);
        },
        crearCurso: async (_, { input }, { repositories }) => {
            return await repositories.cursoRepository.create(input);
        },
        actualizarCurso: async (_, { id, input }, { repositories }) => {
            return await repositories.cursoRepository.update(id, input);
        },
        eliminarCurso: async (_, { id }, { repositories }) => {
            return await repositories.cursoRepository.delete(id);
        },
        crearCalificacion: async (_, { input }, { repositories }) => {
            return await repositories.calificacionRepository.create(input);
        },
        actualizarCalificacion: async (_, { id, input }, { repositories }) => {
            return await repositories.calificacionRepository.update(id, input);
        },
        eliminarCalificacion: async (_, { id }, { repositories }) => {
            return await repositories.calificacionRepository.delete(id);
        },
        generarBoletin: async (_, { input }, { repositories }) => {
            const estudiante = await repositories.estudianteRepository.findById(input.estudianteId);
            const calificaciones = await repositories.calificacionRepository.findByEstudianteIdAndPeriodo(input.estudianteId, input.periodo);
            const promedio = calificaciones.reduce((acc, cal) => acc + cal.calificacion, 0) / calificaciones.length;
            return await repositories.boletinRepository.create({
                ...input,
                calificaciones,
                promedio,
                fechaGeneracion: new Date().toISOString(),
            });
        },
        actualizarBoletin: async (_, { id, input }, { repositories }) => {
            return await repositories.boletinRepository.update(id, input);
        },
        eliminarBoletin: async (_, { id }, { repositories }) => {
            return await repositories.boletinRepository.delete(id);
        },
        crearMatricula: async (_, { input }, { repositories }) => {
            return await repositories.matriculaRepository.create({
                ...input,
                fechaMatricula: new Date().toISOString(),
            });
        },
        actualizarEstadoMatricula: async (_, { id, estado }, { repositories }) => {
            return await repositories.matriculaRepository.updateEstado(id, estado);
        },
        eliminarMatricula: async (_, { id }, { repositories }) => {
            return await repositories.matriculaRepository.delete(id);
        },
        crearAsignatura: async (_, { input }, { repositories }) => {
            return await repositories.asignaturaRepository.create(input);
        },
        actualizarAsignatura: async (_, { id, input }, { repositories }) => {
            return await repositories.asignaturaRepository.update(id, input);
        },
        eliminarAsignatura: async (_, { id }, { repositories }) => {
            return await repositories.asignaturaRepository.delete(id);
        },
    },
    Estudiante: {
        matriculas: async (estudiante, _, { repositories }) => {
            return await repositories.matriculaRepository.findByEstudianteId(estudiante.id);
        },
        calificaciones: async (estudiante, _, { repositories }) => {
            return await repositories.calificacionRepository.findByEstudianteId(estudiante.id);
        },
        boletines: async (estudiante, _, { repositories }) => {
            return await repositories.boletinRepository.findByEstudianteId(estudiante.id);
        },
        asignaturas: async (estudiante, _, { repositories }) => {
            return await repositories.asignaturaRepository.findByEstudianteId(estudiante.id);
        },
    },
    Curso: {
        matriculas: async (curso, _, { repositories }) => {
            return await repositories.matriculaRepository.findByCursoId(curso.id);
        },
    },
    Calificacion: {
        estudiante: async (calificacion, _, { repositories }) => {
            return await repositories.estudianteRepository.findById(calificacion.estudianteId);
        },
    },
    Boletin: {
        estudiante: async (boletin, _, { repositories }) => {
            return await repositories.estudianteRepository.findById(boletin.estudianteId);
        },
        calificaciones: async (boletin, _, { repositories }) => {
            return await repositories.calificacionRepository.findByBoletinId(boletin.id);
        },
    },
    Matricula: {
        estudiante: async (matricula, _, { repositories }) => {
            return await repositories.estudianteRepository.findById(matricula.estudianteId);
        },
        curso: async (matricula, _, { repositories }) => {
            return await repositories.cursoRepository.findById(matricula.cursoId);
        },
        asignaturas: async (matricula, _, { repositories }) => {
            return await repositories.asignaturaRepository.findByMatriculaId(matricula.id);
        },
        Asignatura: {
            Estudiante: async (matricula, _, { repositories }) => {
                return await repositories.estudianteRepository.findById(matricula.estudianteId);
            },
            calificaciones: async (matricula, _, { repositories }) => {
                return await repositories.calificacionRepository.findByMatriculaId(matricula.id);
            },
            boletines: async (matricula, _, { repositories }) => {
                return await repositories.boletinRepository.findByMatriculaId(matricula.id);
            },
            matricula: async (matricula, _, { repositories }) => {
                return await repositories.matriculaRepository.findById(matricula.id);
            },
        },
    },
};
