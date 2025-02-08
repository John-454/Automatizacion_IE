export class Calificacion {
    constructor(id, estudianteId, cursoId, boletinId, calificacion, periodo) {
        this.id = id;
        this.estudianteId = estudianteId;
        this.cursoId = cursoId;
        this.boletinId = boletinId;
        this.calificacion = calificacion;
        this.periodo = periodo;
    }
}
