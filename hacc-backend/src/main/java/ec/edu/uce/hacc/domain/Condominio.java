package ec.edu.uce.hacc.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "condominio")
public class Condominio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_condominio")
    public Long id;
    @Column(nullable = false, unique = true, length = 13)
    public String ruc;
    @Column(nullable = false, length = 120)
    public String nombre;
    @Column(nullable = false, length = 200)
    public String direccion;
    @Column(nullable = false, length = 60)
    public String ciudad;
    @Column(name = "email_contacto", nullable = false, length = 120)
    public String emailContacto;
    @Column(name = "dia_vencimiento", nullable = false)
    public Short diaVencimiento = 5;
    @Column(name = "tasa_mora_anual", nullable = false)
    public java.math.BigDecimal tasaMoraAnual = java.math.BigDecimal.ZERO;
    @Column(name = "periodo_cerrado_hasta")
    public java.time.LocalDate periodoCerradoHasta;
    @Column(nullable = false, length = 12)
    public String estado = "ACTIVO";
}
