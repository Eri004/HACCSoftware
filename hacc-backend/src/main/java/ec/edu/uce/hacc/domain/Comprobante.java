package ec.edu.uce.hacc.domain;

import java.math.BigDecimal;
import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
@Table(name = "comprobante")
public class Comprobante {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) @Column(name = "id_comprobante")
    public Long id;
    @Column(nullable = false)
    public String tipo;
    @Column(nullable = false, unique = true)
    public String numero;
    @Column(name = "fecha_emision", nullable = false)
    public LocalDate fechaEmision;
    @ManyToOne @JoinColumn(name = "id_pago")
    public Pago pago;
    @Column(name = "id_gasto")
    public Long gastoId;
    @Column(name = "id_cuenta_contable")
    public Long cuentaContableId;
    public String referencia;
    @Column(name = "valor_total", nullable = false)
    public BigDecimal valorTotal;
    @Column(nullable = false)
    public String estado = "EMITIDO";
}
