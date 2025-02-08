import { Estudiante } from '../domain/estudiante';

export interface EstudianteRepository {
  findAll(): Promise<Estudiante[]>;
  findById(id: string): Promise<Estudiante | null>;
  create(estudiante: Omit<Estudiante, 'id'>): Promise<Estudiante>;
  update(id: string, estudiante: Partial<Estudiante>): Promise<Estudiante | null>;
  delete(id: string): Promise<boolean>;
}