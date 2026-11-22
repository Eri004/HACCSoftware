package ec.edu.uce.hacc.repository;

import ec.edu.uce.hacc.domain.Pago;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PagoRepository implements PanacheRepositoryBase<Pago, Long> {
    public java.util.List<Pago> porPersona(long personaId) {
        return list("persona.id = ?1 order by fechaPago desc", personaId);
    }
}
