import { gql } from 'apollo-server-express';

export const typeDefs = gql`

# Definir la estructura de los datos que se pueden consultar en una API
  type Boletin {
    id: ID!
    estudiante: Estudiante!
    curso: Curso!
    calificaciones: [Calificacion!]!
    promedio: Float!
  }

  type Matricula {
    id: ID!
    estudiante: Estudiante!
    curso: Curso!
    matriculaFecha: String!
  }

  type Calificacion {
    id: ID!
    estudiante: Estudiante!
    curso: Curso!
# Validar que la calificación sea un número entre 0 y 10
    calificacion: Float! @constraint(min: 0, max: 10)
    periodo: String!
  }

  type Curso {
    id: ID!
    nombre: String!
    profesor: String!
  }

  type Estudiante {
    id: ID!
    nombre: String!
    apellido: String!
    email: String!
    telefono: String!
    direccion: String!
  }

# Definir las operaciones de lectura (consultas) que los clientes pueden realizar en la API

  type Query {
    # Consultas de Estudiantes
    estudiantes: [Estudiante!]!
    estudiante(id: ID!): Estudiante
    
    # Consultas de Cursos
    cursos: [Curso!]!
    curso(id: ID!): Curso
    
    # Consultas de Calificaciones
    calificaciones: [Calificacion!]!
    calificacionesPorEstudiante(estudianteId: ID!): [Calificacion!]!
    calificacionesPorCurso(cursoId: ID!): [Calificacion!]!
    
    # Consultas de Boletines
    boletines: [Boletin!]!
    boletinPorEstudiante(estudianteId: ID!): Boletin
    
    # Consultas de Matrículas
    matriculas: [Matricula!]!
    matriculasPorEstudiante(estudianteId: ID!): [Matricula!]!
    matriculasPorCurso(cursoId: ID!): [Matricula!]!
  }

#Definir las operaciones de escritura (creaciones, actualizaciones y eliminaciones) que los clientes pueden realizar en la API

  type Mutation {
    # Mutaciones de Estudiantes
    crearEstudiante(
      nombre: String!
      apellido: String!
      email: String!
      telefono: String!
      direccion: String!
    ): Estudiante!
    actualizarEstudiante(
      id: ID!
      nombre: String
      apellido: String
      email: String
      telefono: String
      direccion: String
    ): Estudiante!
    eliminarEstudiante(id: ID!): Boolean!

    # Mutaciones de Cursos
    crearCurso(
      nombre: String!
      profesor: String!
    ): Curso!
    actualizarCurso(
      id: ID!
      nombre: String
      profesor: String
    ): Curso!
    eliminarCurso(id: ID!): Boolean!

    # Mutaciones de Calificaciones
    crearCalificacion(
      estudianteId: ID!
      cursoId: ID!
      calificacion: Float!
      periodo: String!
    ): Calificacion!
    actualizarCalificacion(
      id: ID!
      calificacion: Float
      periodo: String
    ): Calificacion!
    eliminarCalificacion(id: ID!): Boolean!

    # Mutaciones de Matrículas
    crearMatricula(
      estudianteId: ID!
      cursoId: ID!
      matriculaFecha: String!
    ): Matricula!
    eliminarMatricula(id: ID!): Boolean!
  }
`;