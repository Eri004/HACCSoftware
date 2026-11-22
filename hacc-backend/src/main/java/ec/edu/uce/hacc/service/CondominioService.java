package ec.edu.uce.hacc.service;

import ec.edu.uce.hacc.domain.Condominio;
import ec.edu.uce.hacc.repository.CondominioRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class CondominioService extends CrudService<Condominio> {
    public CondominioService() { super(); }
    @Inject
    public CondominioService(CondominioRepository repository) {
        super(repository);
    }
}
