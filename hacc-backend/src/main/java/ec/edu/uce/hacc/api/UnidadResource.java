package ec.edu.uce.hacc.api;

import java.util.List;

import ec.edu.uce.hacc.domain.Unidad;
import ec.edu.uce.hacc.service.UnidadService;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/api/unidades")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UnidadResource {
    @Inject
    UnidadService service;

    @GET
    public List<Unidad> listar() {
        return service.listar();
    }

    @GET
    @Path("/{id}")
    public Unidad obtener(@PathParam("id") long id) {
        return service.obtener(id);
    }

    @POST
    public Unidad crear(Unidad entity) {
        return service.crear(entity);
    }

    @PUT
    public Unidad actualizar(Unidad entity) {
        return service.actualizar(entity);
    }

    @DELETE
    @Path("/{id}")
    public Response eliminar(@PathParam("id") long id) {
        service.eliminar(id);
        return Response.noContent().build();
    }
}
