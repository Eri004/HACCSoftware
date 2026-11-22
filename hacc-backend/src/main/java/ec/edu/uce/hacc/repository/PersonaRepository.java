package ec.edu.uce.hacc.repository;

import ec.edu.uce.hacc.domain.Persona;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PersonaRepository implements PanacheRepositoryBase<Persona, Long> {
}
