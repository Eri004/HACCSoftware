package ec.edu.uce.hacc.repository;

import java.util.List;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

@ApplicationScoped
public class AuthRepository {
    @Inject EntityManager entityManager;

    public Object[] buscarUsuario(String username) {
        List<?> rows = entityManager.createNativeQuery("""
                select u.id_usuario,u.username,u.password_hash,r.nombre,p.id_persona,
                       p.nombres,p.apellidos,un.id_unidad,un.codigo,un.bloque
                from usuario u
                join rol r on r.id_rol=u.id_rol
                left join persona p on p.id_persona=u.id_persona
                left join residente rs on rs.id_persona=p.id_persona and rs.estado='ACTIVO'
                left join unidad un on un.id_unidad=rs.id_unidad
                where lower(u.username)=lower(?1) and u.estado='ACTIVO'
                """).setParameter(1, username).getResultList();
        return rows.isEmpty() ? null : (Object[]) rows.get(0);
    }
}
