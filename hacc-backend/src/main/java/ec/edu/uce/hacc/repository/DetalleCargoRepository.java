package ec.edu.uce.hacc.repository;

import ec.edu.uce.hacc.domain.DetalleCargo;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class DetalleCargoRepository implements PanacheRepositoryBase<DetalleCargo, Long> {
    public java.util.List<DetalleCargo> porPersona(long personaId) {
        return list("cargo.persona.id = ?1", personaId);
    }
}
