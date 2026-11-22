package ec.edu.uce.hacc.repository;

import ec.edu.uce.hacc.domain.Unidad;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UnidadRepository implements PanacheRepositoryBase<Unidad, Long> {
}
