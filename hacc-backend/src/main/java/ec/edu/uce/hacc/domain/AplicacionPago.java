package ec.edu.uce.hacc.domain;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name = "aplicacion_pago")
public class AplicacionPago {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) @Column(name = "id_aplicacion")
    public Long id;
    @ManyToOne @JoinColumn(name = "id_pago", nullable = false)
    public Pago pago;
    @ManyToOne @JoinColumn(name = "id_cargo")
    public Cargo cargo;
    @Column(name = "tipo_aplicacion", nullable = false)
    public String tipoAplicacion = "CARGO";
    @Column(name = "monto_aplicado", nullable = false)
    public BigDecimal montoAplicado;
    @Column(name = "fecha_aplicacion", nullable = false)
    public LocalDateTime fechaAplicacion = LocalDateTime.now();
    @Column(nullable = false)
    public String estado = "ACTIVO";
    public String observacion;
}
