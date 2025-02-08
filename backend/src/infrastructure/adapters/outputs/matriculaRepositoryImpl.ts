import { Matricula } from '../../../core/domain/matricula.js';
import { MatriculaRepository } from './../../../core/ports/MatriculaRepository';

export class MatriculaRepositoryImpl implements MatriculaRepository {
  private matriculas: Matricula[] = []; // Puedes inicializarlo con datos vacíos o cargarlos desde una fuente externa

  constructor(matriculas?: Matricula[]) {
    if (matriculas) {
      this.matriculas = matriculas;
    }
  }

  async findAll(): Promise<Matricula[]> {
    try {
      return this.matriculas; // Retorna todas las matrículas
    } catch (error) {
      console.error('Error al obtener todas las matrículas:', error);
      throw new Error('Error al obtener todas las matrículas');
    }
  }

  async findById(id: string): Promise<Matricula | null> {
    try {
      const matricula = this.matriculas.find((mat) => mat.id === id); // Busca una matrícula por su ID
      return matricula || null; // Retorna la matrícula encontrada o null si no existe
    } catch (error) {
      console.error(`Error al obtener la matrícula con ID ${id}:`, error);
      throw new Error(`Error al obtener la matrícula con ID ${id}`);
    }
  }

  async findByEstudianteId(estudianteId: string): Promise<Matricula[]> {
    try {
      const matriculas = this.matriculas.filter(
        (mat) => mat.estudianteId === estudianteId
      ); // Busca matrículas por el ID del estudiante
      return matriculas; // Retorna las matrículas encontradas
    } catch (error) {
      console.error(
        `Error al obtener las matrículas del estudiante con ID ${estudianteId}:`,
        error
      );
      throw new Error(
        `Error al obtener las matrículas del estudiante con ID ${estudianteId}`
      );
    }
  }

  async create(matricula: Partial<Matricula>): Promise<Matricula> {
    try {
      const nuevaMatricula: Matricula = {
        id: (this.matriculas.length + 1).toString(), // Genera un ID único (esto es solo un ejemplo)
        ...matricula,
      } as Matricula;
      this.matriculas.push(nuevaMatricula); // Agrega la nueva matrícula al arreglo
      return nuevaMatricula; // Retorna la matrícula creada
    } catch (error) {
      console.error('Error al crear la matrícula:', error);
      throw new Error('Error al crear la matrícula');
    }
  }

  async update(id: string, matricula: Partial<Matricula>): Promise<Matricula> {
    try {
      const index = this.matriculas.findIndex((mat) => mat.id === id); // Busca la matrícula por su ID
      if (index === -1) {
        throw new Error(`Matrícula con ID ${id} no encontrada`);
      }
      const matriculaActualizada = { ...this.matriculas[index], ...matricula }; // Actualiza la matrícula
      this.matriculas[index] = matriculaActualizada; // Reemplaza la matrícula en el arreglo
      return matriculaActualizada; // Retorna la matrícula actualizada
    } catch (error) {
      console.error(`Error al actualizar la matrícula con ID ${id}:`, error);
      throw new Error(`Error al actualizar la matrícula con ID ${id}`);
    }
  }

  async updateEstado(id: string, estado: string): Promise<Matricula> {
    try {
      const index = this.matriculas.findIndex((mat) => mat.id === id); // Busca la matrícula por su ID
      if (index === -1) {
        throw new Error(`Matrícula con ID ${id} no encontrada`);
      }
      this.matriculas[index].estado = estado; // Actualiza el estado de la matrícula
      return this.matriculas[index]; // Retorna la matrícula actualizada
    } catch (error) {
      console.error(
        `Error al actualizar el estado de la matrícula con ID ${id}:`,
        error
      );
      throw new Error(
        `Error al actualizar el estado de la matrícula con ID ${id}`
      );
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const index = this.matriculas.findIndex((mat) => mat.id === id); // Busca la matrícula por su ID
      if (index === -1) {
        throw new Error(`Matrícula con ID ${id} no encontrada`);
      }
      this.matriculas.splice(index, 1); // Elimina la matrícula del arreglo
      return true; // Retorna true si la eliminación fue exitosa
    } catch (error) {
      console.error(`Error al eliminar la matrícula con ID ${id}:`, error);
      throw new Error(`Error al eliminar la matrícula con ID ${id}`);
    }
  }
}