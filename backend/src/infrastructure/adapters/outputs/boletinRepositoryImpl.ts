import { Boletin } from '../../../core/domain/boletin.js';
import { BoletinRepository } from './../../../core/ports/BoletinRepository';

export class BoletinRepositoryImpl implements BoletinRepository {
  private boletines: Boletin[] = []; // Puedes inicializarlo con datos vacíos o cargarlos desde una fuente externa

  constructor(boletines?: Boletin[]) {
    if (boletines) {
      this.boletines = boletines;
    }
  }

  async findAll(): Promise<Boletin[]> {
    try {
      return this.boletines; // Retorna todos los boletines
    } catch (error) {
      console.error('Error al obtener todos los boletines:', error);
      throw new Error('Error al obtener todos los boletines');
    }
  }

  async findById(id: string): Promise<Boletin | null> {
    try {
      const boletin = this.boletines.find((boletin) => boletin.id === id); // Busca un boletín por su ID
      return boletin || null; // Retorna el boletín encontrado o null si no existe
    } catch (error) {
      console.error(`Error al obtener el boletín con ID ${id}:`, error);
      throw new Error(`Error al obtener el boletín con ID ${id}`);
    }
  }

  async findByEstudianteId(estudianteId: string): Promise<Boletin[]> {
    try {
      const boletines = this.boletines.filter(
        (boletin) => boletin.estudianteId === estudianteId
      ); // Busca boletines por el ID del estudiante
      return boletines; // Retorna los boletines encontrados
    } catch (error) {
      console.error(
        `Error al obtener los boletines del estudiante con ID ${estudianteId}:`,
        error
      );
      throw new Error(
        `Error al obtener los boletines del estudiante con ID ${estudianteId}`
      );
    }
  }

  async create(boletinData: Omit<Boletin, 'id'>): Promise<Boletin> {
    try {
      const newBoletin = new Boletin(
        crypto.randomUUID(),
        boletinData.estudianteId,
        boletinData.cursoId,
        boletinData.calificaciones,
        boletinData.promedio
      );
      
      this.boletines.push(newBoletin);
      return newBoletin;
    } catch (error) {
      console.error('Error al crear el boletín:', error);
      throw new Error('Error al crear el boletín');
    }
  }

  async update(id: string, boletinData: Partial<Boletin>): Promise<Boletin | null> {
    try {
      const index = this.boletines.findIndex(bol => bol.id === id);
      if (index === -1) return null;
      
      this.boletines[index] = {
        ...this.boletines[index],
        ...boletinData
      };
      
      return this.boletines[index];
    } catch (error) {
      console.error(`Error al actualizar el boletín con ID ${id}:`, error);
      throw new Error(`Error al actualizar el boletín con ID ${id}`);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const initialLength = this.boletines.length;
      this.boletines = this.boletines.filter(bol => bol.id !== id);
      return this.boletines.length !== initialLength;
    } catch (error) {
      console.error(`Error al eliminar el boletín con ID ${id}:`, error);
      throw new Error(`Error al eliminar el boletín con ID ${id}`);
    }
  }
}