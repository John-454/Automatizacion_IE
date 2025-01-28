export class Calificacion {
    constructor(
        public id: string,
        public estudianteId: string,
        public cursoId: number,
        public calificacion: number,
        public periodo: string
    ) {}
}