package ec.edu.uce.hacc.service;

import ec.edu.uce.hacc.domain.DetalleCargo;
import ec.edu.uce.hacc.repository.DetalleCargoRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;

@ApplicationScoped
public class DetalleCargoService extends CrudService<DetalleCargo> {
    private final DetalleCargoRepository repository;
    public DetalleCargoService() { super(); this.repository = null; }
    @Inject public DetalleCargoService(DetalleCargoRepository repository) { super(repository); this.repository = repository; }
    public List<DetalleCargo> listar(Long personaId) { return personaId == null ? repository.listAll() : repository.porPersona(personaId); }
}
