package ec.edu.uce.hacc.api;

import java.math.BigDecimal;

import ec.edu.uce.hacc.domain.Pago;
import ec.edu.uce.hacc.service.PagoService;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

@Path("/api/pagos")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class PagoResource {
    @Inject
    PagoService service;

    public static class PaymentRequest {
        @NotNull
        public Long unidadId;
        @NotNull
        public Long personaId;
        @NotNull
        public Long cargoId;
        @NotNull
        @DecimalMin("0.01")
        public BigDecimal monto;
        @NotBlank
        public String formaPago;
        public String referencia;
        @NotBlank
        public String comprobanteNombre;
    }

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
    public Response crear(Pago entity) {
        return Response.status(Status.CREATED).entity(service.crear(entity)).build();
    }

    @POST
    @Path("/registrar")
    public Response registrar(@Valid PaymentRequest request) {
        Pago pago = service.registrar(request.unidadId, request.personaId, request.cargoId, request.monto,
                request.formaPago, request.referencia, request.comprobanteNombre);
        return Response.status(Status.CREATED).entity(pago).build();
    }

    @PUT
    public Response actualizar(Pago entity) {
        return Response.ok(service.actualizar(entity)).build();
    }

    @DELETE
    @Path("/{id}")
    public Response eliminar(@PathParam("id") long id) {
        service.eliminar(id);
        return Response.noContent().build();
    }
}
