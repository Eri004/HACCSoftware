package ec.edu.uce.hacc.repository;

import ec.edu.uce.hacc.domain.Alicuota;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class AlicuotaRepository implements PanacheRepositoryBase<Alicuota, Long> {
    public java.util.List<Alicuota> porPersona(long personaId) {
        return list(
                "unidad.id in (select r.unidad.id from Residente r where r.persona.id = ?1 and r.estado = 'ACTIVO')",
                personaId);
    }
}
