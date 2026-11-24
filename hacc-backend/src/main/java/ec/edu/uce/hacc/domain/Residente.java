package ec.edu.uce.hacc.domain;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "residente")
public class Residente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_residente")
    public Long id;
    @ManyToOne
    @JoinColumn(name = "id_unidad", nullable = false)
    public Unidad unidad;
    @ManyToOne
    @JoinColumn(name = "id_persona", nullable = false)
    public Persona persona;
    @Column(name = "tipo_relacion", nullable = false)
    public String tipoRelacion;
    @Column(name = "es_responsable_pago", nullable = false)
    public Boolean responsablePago = false;
    @Column(name = "porcentaje_propiedad")
    public BigDecimal porcentajePropiedad;
    @Column(name = "recibe_notificaciones", nullable = false)
    public Boolean recibeNotificaciones = true;
    @Column(name = "fecha_inicio", nullable = false)
    public LocalDate fechaInicio;
    @Column(name = "fecha_fin")
    public LocalDate fechaFin;
    @Column(nullable = false)
    public String estado = "ACTIVO";
}
