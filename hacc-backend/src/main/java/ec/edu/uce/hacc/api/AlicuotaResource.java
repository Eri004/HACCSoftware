package ec.edu.uce.hacc.api;

import java.util.List;
import ec.edu.uce.hacc.domain.Alicuota;
import ec.edu.uce.hacc.service.AlicuotaService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/api/alicuotas")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AlicuotaResource {
    @Inject
    AlicuotaService service;

    @GET
    public List<Alicuota> listar(@QueryParam("personaId") Long personaId) {
        return service.listar(personaId);
    }

    @GET
    @Path("/{id}")
    public Alicuota obtener(@PathParam("id") long id) {
        return service.obtener(id);
    }

    @POST
    public Alicuota crear(Alicuota entity) {
        return service.crear(entity);
    }

    @PUT
    public Alicuota actualizar(Alicuota entity) {
        return service.actualizar(entity);
    }

    @DELETE
    @Path("/{id}")
    public Response eliminar(@PathParam("id") long id) {
        service.eliminar(id);
        return Response.noContent().build();
    }
}
