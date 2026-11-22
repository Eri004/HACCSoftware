package ec.edu.uce.hacc.domain;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "cargo")
public class Cargo {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) @Column(name = "id_cargo")
    public Long id;
    @ManyToOne @JoinColumn(name = "id_unidad", nullable = false)
    public Unidad unidad;
    @ManyToOne @JoinColumn(name = "id_persona", nullable = false)
    public Persona persona;
    @Column(nullable = false)
    public Short anio;
    @Column(nullable = false)
    public Short mes;
    @Column(name = "numero_cargo", nullable = false, unique = true)
    public String numeroCargo;
    @Column(name = "fecha_vencimiento", nullable = false)
    public LocalDate fechaVencimiento;
    @Column(nullable = false)
    public BigDecimal total;
    @Column(nullable = false)
    public BigDecimal saldo;
    @Column(nullable = false)
    public String estado;
}
