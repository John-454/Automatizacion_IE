export class EstudianteService {
    constructor(estudianteRepository) {
        this.estudianteRepository = estudianteRepository;
    }
    async getEstudiantes() {
        return this.estudianteRepository.findAll();
    }
    async getEstudianteById(id) {
        return this.estudianteRepository.findById(id);
    }
}
