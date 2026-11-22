package ec.edu.uce.hacc.api;

import java.util.List;
import ec.edu.uce.hacc.domain.Comprobante;
import ec.edu.uce.hacc.service.ComprobanteService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/api/comprobantes") @Consumes(MediaType.APPLICATION_JSON) @Produces(MediaType.APPLICATION_JSON)
public class ComprobanteResource {
    @Inject ComprobanteService service;
    @GET public List<Comprobante> listar() { return service.listar(); }
    @GET @Path("/{id}") public Comprobante obtener(@PathParam("id") long id) { return service.obtener(id); }
    @POST public Comprobante crear(Comprobante entity) { return service.crear(entity); }
    @PUT public Comprobante actualizar(Comprobante entity) { return service.actualizar(entity); }
    @DELETE @Path("/{id}") public Response eliminar(@PathParam("id") long id) { service.eliminar(id); return Response.noContent().build(); }
}
