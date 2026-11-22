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
@Table(name = "unidad")
public class Unidad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_unidad")
    public Long id;
    @ManyToOne
    @JoinColumn(name = "id_condominio", nullable = false)
    public Condominio condominio;
    public String bloque;
    @Column(nullable = false, length = 15)
    public String codigo;
    @Column(name = "tipo_unidad", nullable = false)
    public String tipoUnidad = "DEPARTAMENTO";
    public Short piso;
    @Column(name = "area_m2")
    public java.math.BigDecimal areaM2;
    @Column(name = "estado_ocupacion", nullable = false)
    public String estadoOcupacion = "OCUPADA";
    @Column(name = "clave_catastral")
    public String claveCatastral;
    @Column(nullable = false)
    public String estado = "ACTIVO";
}
