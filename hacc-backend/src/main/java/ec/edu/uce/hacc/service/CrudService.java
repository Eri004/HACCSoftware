package ec.edu.uce.hacc.service;

import java.util.List;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

public class CrudService<T> {
    private final PanacheRepositoryBase<T, Long> repository;

    protected CrudService() {
        this.repository = null;
    }

    public CrudService(PanacheRepositoryBase<T, Long> repository) {
        this.repository = repository;
    }

    public List<T> listar() {
        return repository.listAll();
    }

    public T obtener(long id) {
        return repository.findByIdOptional(id).orElseThrow(() -> new NotFoundException("Registro no encontrado"));
    }

    @Transactional
    public T crear(T entity) {
        repository.persist(entity);
        return entity;
    }

    @Transactional
    public T actualizar(T entity) {
        return repository.getEntityManager().merge(entity);
    }

    @Transactional
    public void eliminar(long id) {
        if (!repository.deleteById(id)) {
            throw new NotFoundException("Registro no encontrado");
        }
    }
}
