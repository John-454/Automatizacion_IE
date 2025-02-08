export class EstudianteRepositoryImpl {
    constructor(estudiantes) {
        this.estudiantes = []; // Puedes inicializarlo con datos vacíos o cargarlos desde una fuente externa
        if (estudiantes) {
            this.estudiantes = estudiantes;
        }
    }
    async create(estudianteData) {
        try {
            const newEstudiante = {
                id: crypto.randomUUID(), // Genera un ID único
                ...estudianteData
            };
            this.estudiantes.push(newEstudiante);
            return newEstudiante;
        }
        catch (error) {
            console.error('Error al crear el estudiante:', error);
            throw new Error('Error al crear el estudiante');
        }
    }
    async findAll() {
        try {
            return this.estudiantes; // Retorna todos los estudiantes
        }
        catch (error) {
            console.error('Error al obtener todos los estudiantes:', error);
            throw new Error('Error al obtener todos los estudiantes');
        }
    }
    async findById(id) {
        try {
            const estudiante = this.estudiantes.find((est) => est.id === id); // Busca un estudiante por su ID
            return estudiante || null; // Retorna el estudiante encontrado o null si no existe
        }
        catch (error) {
            console.error(`Error al obtener el estudiante con ID ${id}:`, error);
            throw new Error(`Error al obtener el estudiante con ID ${id}`);
        }
    }
    async update(id, estudianteData) {
        try {
            const index = this.estudiantes.findIndex(est => est.id === id);
            if (index === -1)
                return null;
            this.estudiantes[index] = {
                ...this.estudiantes[index],
                ...estudianteData
            };
            return this.estudiantes[index];
        }
        catch (error) {
            console.error(`Error al actualizar el estudiante con ID ${id}:`, error);
            throw new Error(`Error al actualizar el estudiante con ID ${id}`);
        }
    }
    async delete(id) {
        try {
            const initialLength = this.estudiantes.length;
            this.estudiantes = this.estudiantes.filter(est => est.id !== id);
            return this.estudiantes.length !== initialLength;
        }
        catch (error) {
            console.error(`Error al eliminar el estudiante con ID ${id}:`, error);
            throw new Error(`Error al eliminar el estudiante con ID ${id}`);
        }
    }
}
