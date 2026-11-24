package ec.edu.uce.hacc.service;

import ec.edu.uce.hacc.domain.Persona;
import ec.edu.uce.hacc.repository.PersonaRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class PersonaService extends CrudService<Persona> {
    public PersonaService() {
        super();
    }

    @Inject
    public PersonaService(PersonaRepository repository) {
        super(repository);
    }
}
