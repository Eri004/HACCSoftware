package ec.edu.uce.hacc.domain;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "pago")
public class Pago {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) @Column(name = "id_pago")
    public Long id;
    @ManyToOne @JoinColumn(name = "id_unidad")
    public Unidad unidad;
    @ManyToOne @JoinColumn(name = "id_persona", nullable = false)
    public Persona persona;
    @Column(name = "id_cuenta_destino")
    public Long cuentaDestinoId;
    @Column(name = "id_cuenta_ingreso")
    public Long cuentaIngresoId;
    @Column(name = "fecha_pago", nullable = false)
    public LocalDate fechaPago;
    @Column(nullable = false)
    public BigDecimal monto;
    @Column(name = "forma_pago", nullable = false)
    public String formaPago;
    public String referencia;
    @Column(nullable = false)
    public String estado = "REGISTRADO";
}
