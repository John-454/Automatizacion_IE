import { ApolloServer } from 'apollo-server';
import { resolvers } from '../../infrastructure/adapters/inputs/resolvers';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { connectToDatabase } from './mongoose';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Leer el schema
const typeDefs = fs.readFileSync(
  path.join(__dirname, './infrastructure/adapters/inputs/schema.graphql'),
  'utf-8'
);

// Importaciones de repositorios
import { EstudianteRepositoryImpl } from '../../infrastructure/adapters/outputs/estudianteRepositoryImpl';
import { CalificacionRepositoryImpl } from '../../infrastructure/adapters/outputs/calificacionRepositoryImpl';
import { BoletinRepositoryImpl } from '../../infrastructure/adapters/outputs/boletinRepositoryImpl';
import { MatriculaRepositoryImpl } from '../../infrastructure/adapters/outputs/matriculaRepositoryImpl';
import { CursoRepositoryImpl } from '../../infrastructure/adapters/outputs/CursoRepositoryImpl';

// Crear instancias de los repositorios
const repositories = {
  estudianteRepository: new EstudianteRepositoryImpl(),
  cursoRepository: new CursoRepositoryImpl(),
  calificacionRepository: new CalificacionRepositoryImpl(),
  boletinRepository: new BoletinRepositoryImpl(),
  matriculaRepository: new MatriculaRepositoryImpl(),
};

connectToDatabase().then(() => {
  console.log('Conexión exitosa a MongoDB');
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      repositories,
    }),
  });

  // Iniciar el servidor
  server.listen().then(({ url }) => {
    console.log(`🚀 Servidor GraphQL listo en ${url}`);
  });
});