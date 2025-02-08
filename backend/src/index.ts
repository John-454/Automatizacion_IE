import { ApolloServer } from 'apollo-server';
import { resolvers } from './infrastructure/adapters/inputs/resolvers.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { readFileSync } from 'fs';
import { gql } from 'graphql-tag';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Leer el schema
const typeDefs = readFileSync(path.join(__dirname, './infrastructure/adapters/inputs/schema.graphql'), 'utf8');


// Importaciones de repositorios
import { EstudianteRepositoryImpl } from './infrastructure/adapters/outputs/estudianteRepositoryImpl.js';
import { CalificacionRepositoryImpl } from './infrastructure/adapters/outputs/calificacionRepositoryImpl.js';
import { BoletinRepositoryImpl } from './infrastructure/adapters/outputs/boletinRepositoryImpl.js';
import { MatriculaRepositoryImpl } from './infrastructure/adapters/outputs/matriculaRepositoryImpl.js';
import { CursoRepositoryImpl } from './infrastructure/adapters/outputs/CursoRepositoryImpl.js';
import { AsignaturaRepositoryImpl } from './infrastructure/adapters/outputs/asignaturaRepositoryImpl.js';

// Crear instancias de los repositorios
const repositories = {
  estudianteRepository: new EstudianteRepositoryImpl(),
  cursoRepository: new CursoRepositoryImpl(),
  calificacionRepository: new CalificacionRepositoryImpl(),
  boletinRepository: new BoletinRepositoryImpl(),
  matriculaRepository: new MatriculaRepositoryImpl(),
  asignaturaRepository: new AsignaturaRepositoryImpl(),
};

// Configurar Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    repositories
  }),
});

// Iniciar el servidor
server.listen().then(({ url }) => {
  console.log(`🚀 Servidor GraphQL listo en ${url}`);
});