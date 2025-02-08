export class Calificacion {
    constructor(
        public id: string,
        public estudianteId: string,
        public cursoId: string,
        public boletinId: string,
        public calificacion: number,
        public periodo: string
    ) {}
}