package ec.edu.uce.hacc.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "persona")
public class Persona {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_persona")
    public Long id;
    @Column(name = "tipo_identificacion", nullable = false)
    public String tipoIdentificacion;
    @Column(name = "numero_identificacion", nullable = false, unique = true)
    public String numeroIdentificacion;
    @Column(nullable = false)
    public String nombres;
    @Column(nullable = false)
    public String apellidos;
    public String email;
    public String telefono;
    @Column(name = "fecha_nacimiento")
    public java.time.LocalDate fechaNacimiento;
    public String direccion;
    @Column(nullable = false)
    public String estado = "ACTIVO";
}
