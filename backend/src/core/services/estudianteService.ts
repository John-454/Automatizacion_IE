import { EstudianteRepository } from '../ports/EstudianteRepository';
import { Estudiante } from '../domain/estudiante';

export class EstudianteService {
  constructor(private estudianteRepository: EstudianteRepository) {}

  async getEstudiantes(): Promise<Estudiante[]> {
    return this.estudianteRepository.findAll();
  }

  async getEstudianteById(id: string): Promise<Estudiante | null> {
    return this.estudianteRepository.findById(id);
  }
}