export class Estudiante {
    constructor(
        public id: string, 
        public nombre: string, 
        public apellido: string,
        public email: string,
        public telefono: string,
        public direccion: string,
        public acudiente: string
    ) {}
}