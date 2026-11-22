package ec.edu.uce.hacc.api;

import java.util.List;
import java.math.BigDecimal;
import ec.edu.uce.hacc.domain.Pago;
import ec.edu.uce.hacc.service.PagoService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;

@Path("/api/pagos") @Consumes(MediaType.APPLICATION_JSON) @Produces(MediaType.APPLICATION_JSON)
public class PagoResource {
    @Inject PagoService service;

    public static class PaymentRequest {
        @NotNull public Long unidadId;
        @NotNull public Long personaId;
        @NotNull public Long cargoId;
        @NotNull @DecimalMin("0.01") public BigDecimal monto;
        @NotBlank public String formaPago;
        public String referencia;
        @NotBlank public String comprobanteNombre;
    }

    @GET public List<Pago> listar(@QueryParam("personaId") Long personaId) { return service.listar(personaId); }
    @GET @Path("/{id}") public Pago obtener(@PathParam("id") long id) { return service.obtener(id); }
    @POST public Pago crear(Pago entity) { return service.crear(entity); }
    @POST @Path("/registrar") public Pago registrar(@Valid PaymentRequest request) {
        return service.registrar(request.unidadId, request.personaId, request.cargoId, request.monto,
                request.formaPago, request.referencia, request.comprobanteNombre);
    }
    @PUT public Pago actualizar(Pago entity) { return service.actualizar(entity); }
    @DELETE @Path("/{id}") public Response eliminar(@PathParam("id") long id) { service.eliminar(id); return Response.noContent().build(); }
}
