package ec.edu.uce.hacc.api;

import java.util.List;
import ec.edu.uce.hacc.domain.Cargo;
import ec.edu.uce.hacc.service.CargoService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.QueryParam;

@Path("/api/cargos") @Consumes(MediaType.APPLICATION_JSON) @Produces(MediaType.APPLICATION_JSON)
public class CargoResource {
    @Inject CargoService service;
    @GET public List<Cargo> listar(@QueryParam("personaId") Long personaId) { return service.listar(personaId); }
    @GET @Path("/{id}") public Cargo obtener(@PathParam("id") long id) { return service.obtener(id); }
    @POST public Cargo crear(Cargo entity) { return service.crear(entity); }
    @PUT public Cargo actualizar(Cargo entity) { return service.actualizar(entity); }
    @DELETE @Path("/{id}") public Response eliminar(@PathParam("id") long id) { service.eliminar(id); return Response.noContent().build(); }
}
