package ec.edu.uce.hacc.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "detalle_cargo")
public class DetalleCargo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detalle_cargo")
    public Long id;
    @ManyToOne
    @JoinColumn(name = "id_cargo", nullable = false)
    public Cargo cargo;
    @Column(name = "id_alicuota")
    public Long alicuotaId;
    @Column(name = "id_rubro")
    public Long rubroId;
    @Column(name = "tipo_concepto", nullable = false)
    public String tipoConcepto;
    @Column(nullable = false)
    public String descripcion;
    public java.math.BigDecimal cantidad;
    @Column(name = "valor_unitario")
    public java.math.BigDecimal valorUnitario;
    public java.math.BigDecimal subtotal;
}
