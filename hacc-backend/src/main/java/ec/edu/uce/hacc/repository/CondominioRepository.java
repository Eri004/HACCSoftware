package ec.edu.uce.hacc.repository;
import ec.edu.uce.hacc.domain.Condominio;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CondominioRepository implements PanacheRepositoryBase<Condominio, Long> {
}
