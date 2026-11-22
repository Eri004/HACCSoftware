package ec.edu.uce.hacc.domain;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "alicuota")
public class Alicuota {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) @Column(name = "id_alicuota")
    public Long id;
    @ManyToOne @JoinColumn(name = "id_unidad", nullable = false)
    public Unidad unidad;
    @Column(nullable = false)
    public BigDecimal porcentaje;
    @Column(name = "cuota_ordinaria", nullable = false)
    public BigDecimal cuotaOrdinaria;
    @Column(name = "vigente_desde", nullable = false)
    public LocalDate vigenteDesde;
    @Column(name = "vigente_hasta")
    public LocalDate vigenteHasta;
    @Column(name = "resolucion_asamblea")
    public String resolucionAsamblea;
    @Column(name = "motivo_cambio")
    public String motivoCambio;
    @Column(nullable = false)
    public String estado = "ACTIVO";
}
