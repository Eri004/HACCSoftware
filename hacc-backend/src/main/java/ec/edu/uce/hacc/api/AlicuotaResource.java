package ec.edu.uce.hacc.api;

import ec.edu.uce.hacc.domain.Alicuota;
import ec.edu.uce.hacc.service.AlicuotaService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;

@Path("/api/alicuotas")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AlicuotaResource {
    @Inject
    AlicuotaService service;

    @GET
    public Response listar(@QueryParam("personaId") Long personaId) {
        return Response.ok(service.listar(personaId)).build();
    }

    @GET
    @Path("/{id}")
    public Response obtener(@PathParam("id") long id) {
        return Response.ok(service.obtener(id)).build();
    }

    @POST
    public Response crear(Alicuota entity) {
        return Response.status(Status.CREATED).entity(service.crear(entity)).build();
    }

    @PUT
    public Response actualizar(Alicuota entity) {
        return Response.ok(service.actualizar(entity)).build();
    }

    @DELETE
    @Path("/{id}")
    public Response eliminar(@PathParam("id") long id) {
        service.eliminar(id);
        return Response.noContent().build();
    }
}
