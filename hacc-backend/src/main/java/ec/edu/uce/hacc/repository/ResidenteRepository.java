package ec.edu.uce.hacc.repository;

import ec.edu.uce.hacc.domain.Residente;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ResidenteRepository implements PanacheRepositoryBase<Residente, Long> {
}
