package ec.edu.uce.hacc.api;

import java.util.List;

import ec.edu.uce.hacc.domain.Residente;
import ec.edu.uce.hacc.service.ResidenteService;
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

@Path("/api/residentes")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ResidenteResource {
    @Inject
    ResidenteService service;

    @GET
    public List<Residente> listar() {
        return service.listar();
    }

    @GET
    @Path("/{id}")
    public Residente obtener(@PathParam("id") long id) {
        return service.obtener(id);
    }

    @POST
    public Residente crear(Residente entity) {
        return service.crear(entity);
    }

    @PUT
    public Residente actualizar(Residente entity) {
        return service.actualizar(entity);
    }

    @DELETE
    @Path("/{id}")
    public Response eliminar(@PathParam("id") long id) {
        service.eliminar(id);
        return Response.noContent().build();
    }
}
