import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Boletin {
    id: ID!
    estudianteId: ID!
    cursoId: ID!
    calificaciones: [Calificacion!]!
  }

  type Matricula {
    id: ID!
    estudianteId: ID!
    cursoId: ID!
    fecha: String!
  }

  type Calificacion {
    id: ID!
    estudianteId: ID!
    cursoId: ID!
    nota: Float!
  }

  type Curso {
    id: ID!
    nombre: String!
    descripcion: String!
  }

  type Estudiante {
    id: ID!
    nombre: String!
    apellido: String!
    edad: Int!
  }

  type Query {
    boletines: [Boletin!]!
    boletin(id: ID!): Boletin
    matriculas: [Matricula!]!
    matricula(id: ID!): Matricula
    calificaciones: [Calificacion!]!
    calificacion(id: ID!): Calificacion
    cursos: [Curso!]!
    curso(id: ID!): Curso
    estudiantes: [Estudiante!]!
    estudiante(id: ID!): Estudiante
  }

  type Mutation {
    crearBoletin(estudianteId: ID!, cursoId: ID!): Boletin
    crearMatricula(estudianteId: ID!, cursoId: ID!, fecha: String!): Matricula
    crearCalificacion(estudianteId: ID!, cursoId: ID!, nota: Float!): Calificacion
    crearCurso(nombre: String!, descripcion: String!): Curso
    crearEstudiante(nombre: String!, apellido: String!, edad: Int!): Estudiante
    actualizarBoletin(id: ID!, estudianteId: ID, cursoId: ID): Boletin
    actualizarMatricula(id: ID!, estudianteId: ID, cursoId: ID, fecha: String): Matricula
    actualizarCalificacion(id: ID!, estudianteId: ID, cursoId: ID, nota: Float): Calificacion
    actualizarCurso(id: ID!, nombre: String, descripcion: String): Curso
    actualizarEstudiante(id: ID!, nombre: String, apellido: String, edad: Int): Estudiante
    eliminarBoletin(id: ID!): Boletin
    eliminarMatricula(id: ID!): Matricula
    eliminarCalificacion(id: ID!): Calificacion
    eliminarCurso(id: ID!): Curso
    eliminarEstudiante(id: ID!): Estudiante
  }
`;