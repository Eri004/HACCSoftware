package ec.edu.uce.hacc.repository;

import ec.edu.uce.hacc.domain.Comprobante;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ComprobanteRepository implements PanacheRepositoryBase<Comprobante, Long> {
}
