package ec.edu.uce.hacc.api;

import ec.edu.uce.hacc.domain.DetalleCargo;
import ec.edu.uce.hacc.service.DetalleCargoService;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;

@Path("/api/detalles-cargo")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class DetalleCargoResource {
    @Inject
    DetalleCargoService service;

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
    public Response crear(DetalleCargo entity) {
        return Response.status(Status.CREATED).entity(service.crear(entity)).build();
    }

    @PUT
    public Response actualizar(DetalleCargo entity) {
        return Response.ok(service.actualizar(entity)).build();
    }

    @DELETE
    @Path("/{id}")
    public Response eliminar(@PathParam("id") long id) {
        service.eliminar(id);
        return Response.noContent().build();
    }
}
