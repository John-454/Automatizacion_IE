export class CursoRepositoryImpl {
    constructor(cursos) {
        this.cursos = []; // Puedes inicializarlo con datos vacíos o cargarlos desde una fuente externa
        if (cursos) {
            this.cursos = cursos;
        }
    }
    async findAll() {
        try {
            return this.cursos; // Retorna todos los cursos
        }
        catch (error) {
            console.error('Error al obtener todos los cursos:', error);
            throw new Error('Error al obtener todos los cursos');
        }
    }
    async findById(id) {
        try {
            const curso = this.cursos.find((curso) => curso.id === id); // Busca un curso por su ID
            return curso || null; // Retorna el curso encontrado o null si no existe
        }
        catch (error) {
            console.error(`Error al obtener el curso con ID ${id}:`, error);
            throw new Error(`Error al obtener el curso con ID ${id}`);
        }
    }
    async create(cursoData) {
        const newCurso = {
            id: crypto.randomUUID(),
            ...cursoData
        };
        this.cursos.push(newCurso);
        return newCurso;
    }
    async update(id, cursoData) {
        const index = this.cursos.findIndex(c => c.id === id);
        if (index === -1)
            return null;
        this.cursos[index] = {
            ...this.cursos[index],
            ...cursoData
        };
        return this.cursos[index];
    }
    async delete(id) {
        const initialLength = this.cursos.length;
        this.cursos = this.cursos.filter(c => c.id !== id);
        return this.cursos.length !== initialLength;
    }
}
