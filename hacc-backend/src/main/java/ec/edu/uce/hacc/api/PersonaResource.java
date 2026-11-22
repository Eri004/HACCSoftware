package ec.edu.uce.hacc.api;

import java.util.List;
import ec.edu.uce.hacc.domain.Persona;
import ec.edu.uce.hacc.service.PersonaService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/api/personas") @Consumes(MediaType.APPLICATION_JSON) @Produces(MediaType.APPLICATION_JSON)
public class PersonaResource {
    @Inject PersonaService service;
    @GET public List<Persona> listar() { return service.listar(); }
    @GET @Path("/{id}") public Persona obtener(@PathParam("id") long id) { return service.obtener(id); }
    @POST public Persona crear(Persona entity) { return service.crear(entity); }
    @PUT public Persona actualizar(Persona entity) { return service.actualizar(entity); }
    @DELETE @Path("/{id}") public Response eliminar(@PathParam("id") long id) { service.eliminar(id); return Response.noContent().build(); }
}
