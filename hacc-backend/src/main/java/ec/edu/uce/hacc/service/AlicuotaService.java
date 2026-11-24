package ec.edu.uce.hacc.service;

import java.util.List;

import ec.edu.uce.hacc.domain.Alicuota;
import ec.edu.uce.hacc.repository.AlicuotaRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class AlicuotaService extends CrudService<Alicuota> {
    private final AlicuotaRepository repository;

    public AlicuotaService() {
        super();
        this.repository = null;
    }

    @Inject
    public AlicuotaService(AlicuotaRepository repository) {
        super(repository);
        this.repository = repository;
    }

    public List<Alicuota> listar(Long personaId) {
        return personaId == null ? repository.listAll() : repository.porPersona(personaId);
    }
}
