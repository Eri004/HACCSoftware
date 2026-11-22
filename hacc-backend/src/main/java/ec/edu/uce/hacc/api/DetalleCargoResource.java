package ec.edu.uce.hacc.api;

import java.util.List;
import ec.edu.uce.hacc.domain.DetalleCargo;
import ec.edu.uce.hacc.service.DetalleCargoService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/api/detalles-cargo") @Consumes(MediaType.APPLICATION_JSON) @Produces(MediaType.APPLICATION_JSON)
public class DetalleCargoResource {
    @Inject DetalleCargoService service;
    @GET public List<DetalleCargo> listar(@QueryParam("personaId") Long personaId) { return service.listar(personaId); }
    @GET @Path("/{id}") public DetalleCargo obtener(@PathParam("id") long id) { return service.obtener(id); }
    @POST public DetalleCargo crear(DetalleCargo entity) { return service.crear(entity); }
    @PUT public DetalleCargo actualizar(DetalleCargo entity) { return service.actualizar(entity); }
    @DELETE @Path("/{id}") public Response eliminar(@PathParam("id") long id) { service.eliminar(id); return Response.noContent().build(); }
}
