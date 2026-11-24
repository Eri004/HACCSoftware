package ec.edu.uce.hacc.service;

import ec.edu.uce.hacc.domain.Residente;
import ec.edu.uce.hacc.repository.ResidenteRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class ResidenteService extends CrudService<Residente> {
    public ResidenteService() {
        super();
    }

    @Inject
    public ResidenteService(ResidenteRepository repository) {
        super(repository);
    }
}
