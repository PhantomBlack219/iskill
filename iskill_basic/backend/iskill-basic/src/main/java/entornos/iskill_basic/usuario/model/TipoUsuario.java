package entornos.iskill_basic.usuario.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "tipo_usuario")
public class TipoUsuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tipo_usuario_id;

    @Column
    @NotNull
    private String nombre;

    @Column
    private String descripcion;

    // Constructors
    public TipoUsuario() {
    }

    public TipoUsuario(Long tipo_usuario_id, String nombre, String descripcion) {
        this.tipo_usuario_id = tipo_usuario_id;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    // Getters and Setters

    public Long getTipo_usuario_id() {
        return tipo_usuario_id;
    }

    public void setTipo_usuario_id(Long tipo_usuario_id) {
        this.tipo_usuario_id = tipo_usuario_id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

}
