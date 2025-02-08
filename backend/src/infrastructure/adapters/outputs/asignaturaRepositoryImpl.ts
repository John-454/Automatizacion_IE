import { Asignatura } from '../../../core/domain/asignatura.js';
import { AsignaturaRepository } from '../../../core/ports/AsignaturaRepository';

export class AsignaturaRepositoryImpl implements AsignaturaRepository {
    private asignaturas: Asignatura[] = [];

    constructor(asignaturas?: Asignatura[]) {
        if (asignaturas) {
            this.asignaturas = asignaturas;
        }
    }

    async findAll(): Promise<Asignatura[]> {
        try {
            return this.asignaturas;
        } catch (error) {
            console.error('Error al obtener todas las asignaturas:', error);
            throw new Error('Error al obtener todas las asignaturas');
        }
    }

    async findById(id: string): Promise<Asignatura | null> {
        try {
            const asignatura = this.asignaturas.find(a => a.id === id);
            return asignatura || null;
        } catch (error) {
            console.error(`Error al obtener la asignatura con ID ${id}:`, error);
            throw new Error(`Error al obtener la asignatura con ID ${id}`);
        }
    }

    async create(asignaturaData: Omit<Asignatura, 'id'>): Promise<Asignatura> {
        try {
            const newAsignatura = new Asignatura(
                crypto.randomUUID(),
                asignaturaData.nombre,
                asignaturaData.profesor,
                asignaturaData.horario
            );
            
            this.asignaturas.push(newAsignatura);
            return newAsignatura;
        } catch (error) {
            console.error('Error al crear la asignatura:', error);
            throw new Error('Error al crear la asignatura');
        }
    }

    async update(id: string, asignaturaData: Partial<Asignatura>): Promise<Asignatura | null> {
        try {
            const index = this.asignaturas.findIndex(a => a.id === id);
            if (index === -1) return null;
            
            this.asignaturas[index] = {
                ...this.asignaturas[index],
                ...asignaturaData
            };
            
            return this.asignaturas[index];
        } catch (error) {
            console.error(`Error al actualizar la asignatura con ID ${id}:`, error);
            throw new Error(`Error al actualizar la asignatura con ID ${id}`);
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const initialLength = this.asignaturas.length;
            this.asignaturas = this.asignaturas.filter(a => a.id !== id);
            return this.asignaturas.length !== initialLength;
        } catch (error) {
            console.error(`Error al eliminar la asignatura con ID ${id}:`, error);
            throw new Error(`Error al eliminar la asignatura con ID ${id}`);
        }
    }
}