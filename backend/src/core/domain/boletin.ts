import { Calificacion } from "./calificacion";

export class Boletin {
    constructor(
        public id: string,
        public estudianteId: string,
        public calificaciones: Calificacion[],
        public promedio: number
    ) {}
}