package ec.edu.uce.hacc.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import ec.edu.uce.hacc.domain.Pago;
import ec.edu.uce.hacc.domain.Cargo;
import ec.edu.uce.hacc.domain.AplicacionPago;
import ec.edu.uce.hacc.domain.Comprobante;
import ec.edu.uce.hacc.repository.AplicacionPagoRepository;
import ec.edu.uce.hacc.repository.CargoRepository;
import ec.edu.uce.hacc.repository.ComprobanteRepository;
import ec.edu.uce.hacc.repository.PagoRepository;
import ec.edu.uce.hacc.repository.PersonaRepository;
import ec.edu.uce.hacc.repository.UnidadRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.NotFoundException;

@ApplicationScoped
public class PagoService extends CrudService<Pago> {
    @Inject PagoRepository pagoRepository;
    @Inject CargoRepository cargoRepository;
    @Inject PersonaRepository personaRepository;
    @Inject UnidadRepository unidadRepository;
    @Inject AplicacionPagoRepository aplicacionRepository;
    @Inject ComprobanteRepository comprobanteRepository;

    public PagoService() { super(); }
    @Inject public PagoService(PagoRepository repository) { super(repository); }

    public List<Pago> listar(Long personaId) {
        return personaId == null ? pagoRepository.listAll() : pagoRepository.porPersona(personaId);
    }

    @Transactional
    public Pago registrar(long unidadId, long personaId, long cargoId, BigDecimal monto, String formaPago,
            String referencia, String comprobanteNombre) {
        Cargo cargo = cargoRepository.findById(cargoId);
        if (cargo == null || !cargo.unidad.id.equals(unidadId) || !cargo.persona.id.equals(personaId)) {
            throw new NotFoundException("Cargo no encontrado para esta unidad y persona");
        }
        if ("ANULADO".equals(cargo.estado) || monto.signum() <= 0 || monto.compareTo(cargo.saldo) > 0) {
            throw new BadRequestException("El monto o el estado del cargo no permite registrar el pago");
        }

        Pago pago = new Pago();
        pago.unidad = unidadRepository.findById(unidadId);
        pago.persona = personaRepository.findById(personaId);
        pago.fechaPago = LocalDate.now();
        pago.monto = monto;
        pago.formaPago = formaPago.toUpperCase();
        pago.referencia = referencia;
        pagoRepository.persistAndFlush(pago);

        AplicacionPago aplicacion = new AplicacionPago();
        aplicacion.pago = pago;
        aplicacion.cargo = cargo;
        aplicacion.montoAplicado = monto;
        aplicacion.observacion = comprobanteNombre;
        aplicacionRepository.persist(aplicacion);

        cargo.saldo = cargo.saldo.subtract(monto);
        cargo.estado = cargo.saldo.signum() == 0 ? "PAGADO" : "PARCIAL";

        Comprobante comprobante = new Comprobante();
        comprobante.tipo = "INGRESO";
        comprobante.numero = "RI-" + pago.fechaPago.getYear() + "-" + String.format("%06d", pago.id);
        comprobante.fechaEmision = pago.fechaPago;
        comprobante.pago = pago;
        comprobante.referencia = referencia;
        comprobante.valorTotal = monto;
        comprobanteRepository.persist(comprobante);
        return pago;
    }
}
