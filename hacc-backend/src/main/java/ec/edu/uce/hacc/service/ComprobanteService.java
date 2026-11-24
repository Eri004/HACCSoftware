package ec.edu.uce.hacc.service;

import ec.edu.uce.hacc.domain.Comprobante;
import ec.edu.uce.hacc.repository.ComprobanteRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class ComprobanteService extends CrudService<Comprobante> {
    public ComprobanteService() {
        super();
    }

    @Inject
    public ComprobanteService(ComprobanteRepository repository) {
        super(repository);
    }
}
