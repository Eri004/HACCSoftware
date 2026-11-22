package ec.edu.uce.hacc.repository;

import ec.edu.uce.hacc.domain.AplicacionPago;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class AplicacionPagoRepository implements PanacheRepositoryBase<AplicacionPago, Long> {
}
