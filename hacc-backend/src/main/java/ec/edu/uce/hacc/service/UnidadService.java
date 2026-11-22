package ec.edu.uce.hacc.service;

import ec.edu.uce.hacc.domain.Unidad;
import ec.edu.uce.hacc.repository.UnidadRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class UnidadService extends CrudService<Unidad> {
    public UnidadService() { super(); }
    @Inject public UnidadService(UnidadRepository repository) { super(repository); }
}
