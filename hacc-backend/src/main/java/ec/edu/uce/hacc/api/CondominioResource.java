package ec.edu.uce.hacc.api;

import java.util.List;
import ec.edu.uce.hacc.domain.Condominio;
import ec.edu.uce.hacc.service.CondominioService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/api/condominios")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CondominioResource {
    @Inject CondominioService service;
    @GET public List<Condominio> listar() { return service.listar(); }
    @GET @Path("/{id}") public Condominio obtener(@PathParam("id") long id) { return service.obtener(id); }
    @POST public Condominio crear(Condominio entity) { return service.crear(entity); }
    @PUT public Condominio actualizar(Condominio entity) { return service.actualizar(entity); }
    @DELETE @Path("/{id}") public Response eliminar(@PathParam("id") long id) { service.eliminar(id); return Response.noContent().build(); }
}
