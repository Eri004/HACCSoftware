package ec.edu.uce.hacc.repository;

import java.util.List;

import ec.edu.uce.hacc.domain.Cargo;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CargoRepository implements PanacheRepositoryBase<Cargo, Long> {
    public List<Cargo> porPersona(long personaId) {
        return list("persona.id = ?1 order by anio desc, mes desc", personaId);
    }
}
