package ec.edu.uce.hacc.service;

import java.util.List;

import ec.edu.uce.hacc.domain.Cargo;
import ec.edu.uce.hacc.repository.CargoRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class CargoService extends CrudService<Cargo> {
    private final CargoRepository repository;

    public CargoService() {
        super();
        this.repository = null;
    }

    @Inject
    public CargoService(CargoRepository repository) {
        super(repository);
        this.repository = repository;
    }

    public List<Cargo> listar(Long personaId) {
        return personaId == null ? repository.listAll() : repository.porPersona(personaId);
    }
}
