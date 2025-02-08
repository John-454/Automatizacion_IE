import { Asignatura } from '../../../core/domain/asignatura.js';
export class AsignaturaRepositoryImpl {
    constructor(asignaturas) {
        this.asignaturas = [];
        if (asignaturas) {
            this.asignaturas = asignaturas;
        }
    }
    async findAll() {
        try {
            return this.asignaturas;
        }
        catch (error) {
            console.error('Error al obtener todas las asignaturas:', error);
            throw new Error('Error al obtener todas las asignaturas');
        }
    }
    async findById(id) {
        try {
            const asignatura = this.asignaturas.find(a => a.id === id);
            return asignatura || null;
        }
        catch (error) {
            console.error(`Error al obtener la asignatura con ID ${id}:`, error);
            throw new Error(`Error al obtener la asignatura con ID ${id}`);
        }
    }
    async create(asignaturaData) {
        try {
            const newAsignatura = new Asignatura(crypto.randomUUID(), asignaturaData.nombre, asignaturaData.profesor, asignaturaData.horario);
            this.asignaturas.push(newAsignatura);
            return newAsignatura;
        }
        catch (error) {
            console.error('Error al crear la asignatura:', error);
            throw new Error('Error al crear la asignatura');
        }
    }
    async update(id, asignaturaData) {
        try {
            const index = this.asignaturas.findIndex(a => a.id === id);
            if (index === -1)
                return null;
            this.asignaturas[index] = {
                ...this.asignaturas[index],
                ...asignaturaData
            };
            return this.asignaturas[index];
        }
        catch (error) {
            console.error(`Error al actualizar la asignatura con ID ${id}:`, error);
            throw new Error(`Error al actualizar la asignatura con ID ${id}`);
        }
    }
    async delete(id) {
        try {
            const initialLength = this.asignaturas.length;
            this.asignaturas = this.asignaturas.filter(a => a.id !== id);
            return this.asignaturas.length !== initialLength;
        }
        catch (error) {
            console.error(`Error al eliminar la asignatura con ID ${id}:`, error);
            throw new Error(`Error al eliminar la asignatura con ID ${id}`);
        }
    }
}
