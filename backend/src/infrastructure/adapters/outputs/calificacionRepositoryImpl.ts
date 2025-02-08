import { Calificacion } from '../../../core/domain/calificacion.js';
import { CalificacionRepository } from './../../../core/ports/CalificacionRepository';

export class CalificacionRepositoryImpl implements CalificacionRepository {
  private calificaciones: Calificacion[] = []; // Puedes inicializarlo con datos vacíos o cargarlos desde una fuente externa

  constructor(calificaciones?: Calificacion[]) {
    if (calificaciones) {
      this.calificaciones = calificaciones;
    }
  }

  async findAll(): Promise<Calificacion[]> {
    try {
      return this.calificaciones; // Retorna todas las calificaciones
    } catch (error) {
      console.error('Error al obtener todas las calificaciones:', error);
      throw new Error('Error al obtener todas las calificaciones');
    }
  }

  async findById(id: string): Promise<Calificacion | null> {
    try {
      const calificacion = this.calificaciones.find((cal) => cal.id === id); // Busca una calificación por su ID
      return calificacion || null; // Retorna la calificación encontrada o null si no existe
    } catch (error) {
      console.error(`Error al obtener la calificación con ID ${id}:`, error);
      throw new Error(`Error al obtener la calificación con ID ${id}`);
    }
  }

  async findByEstudianteId(estudianteId: string): Promise<Calificacion[]> {
    try {
      const calificaciones = this.calificaciones.filter(
        (cal) => cal.estudianteId === estudianteId
      ); // Busca calificaciones por el ID del estudiante
      return calificaciones; // Retorna las calificaciones encontradas
    } catch (error) {
      console.error(
        `Error al obtener las calificaciones del estudiante con ID ${estudianteId}:`,
        error
      );
      throw new Error(
        `Error al obtener las calificaciones del estudiante con ID ${estudianteId}`
      );
    }
  }

  async findByEstudianteIdAndPeriodo(
    estudianteId: string,
    periodo: string
  ): Promise<Calificacion[]> {
    try {
      const calificaciones = this.calificaciones.filter(
        (cal) => cal.estudianteId === estudianteId && cal.periodo === periodo
      ); // Busca calificaciones por el ID del estudiante y el período
      return calificaciones; // Retorna las calificaciones encontradas
    } catch (error) {
      console.error(
        `Error al obtener las calificaciones del estudiante con ID ${estudianteId} y período ${periodo}:`,
        error
      );
      throw new Error(
        `Error al obtener las calificaciones del estudiante con ID ${estudianteId} y período ${periodo}`
      );
    }
  }

  async findByCursoId(cursoId: string): Promise<Calificacion[]> {
    try {
      const calificaciones = this.calificaciones.filter(
        (cal) => cal.cursoId === cursoId
      ); // Busca calificaciones por el ID del curso
      return calificaciones; // Retorna las calificaciones encontradas
    } catch (error) {
      console.error(
        `Error al obtener las calificaciones del curso con ID ${cursoId}:`,
        error
      );
      throw new Error(
        `Error al obtener las calificaciones del curso con ID ${cursoId}`
      );
    }
  }

  async findByBoletinId(boletinId: string): Promise<Calificacion[]> {
    try {
      const calificaciones = this.calificaciones.filter(
        (cal) => cal.boletinId === boletinId
      ); // Busca calificaciones por el ID del boletín
      return calificaciones; // Retorna las calificaciones encontradas
    } catch (error) {
      console.error(
        `Error al obtener las calificaciones del boletín con ID ${boletinId}:`,
        error
      );
      throw new Error(
        `Error al obtener las calificaciones del boletín con ID ${boletinId}`
      );
    }
  }

  async create(calificacionData: Omit<Calificacion, 'id'>): Promise<Calificacion> {
    try {
      const newCalificacion = new Calificacion(
        crypto.randomUUID(),
        calificacionData.estudianteId,
        calificacionData.cursoId,
        calificacionData.boletinId,
        calificacionData.calificacion,
        calificacionData.periodo
      );
      
      this.calificaciones.push(newCalificacion);
      return newCalificacion;
    } catch (error) {
      console.error('Error al crear la calificación:', error);
      throw new Error('Error al crear la calificación');
    }
  }

  async update(id: string, calificacionData: Partial<Calificacion>): Promise<Calificacion | null> {
    try {
      const index = this.calificaciones.findIndex(cal => cal.id === id);
      if (index === -1) return null;
      
      this.calificaciones[index] = {
        ...this.calificaciones[index],
        ...calificacionData
      };
      
      return this.calificaciones[index];
    } catch (error) {
      console.error(`Error al actualizar la calificación con ID ${id}:`, error);
      throw new Error(`Error al actualizar la calificación con ID ${id}`);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const initialLength = this.calificaciones.length;
      this.calificaciones = this.calificaciones.filter(cal => cal.id !== id);
      return this.calificaciones.length !== initialLength;
    } catch (error) {
      console.error(`Error al eliminar la calificación con ID ${id}:`, error);
      throw new Error(`Error al eliminar la calificación con ID ${id}`);
    }
  }
}