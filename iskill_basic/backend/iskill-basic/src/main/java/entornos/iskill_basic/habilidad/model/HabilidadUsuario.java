package entornos.iskill_basic.habilidad.model;

import entornos.iskill_basic.usuario.model.Usuario;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "habilidad_usuario")
public class HabilidadUsuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long habilidad_usuario_id;

    @ManyToOne
    @JoinColumn(name = "habilidad_id")
    @NotNull
    private Habilidad habilidad;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    @NotNull
    private Usuario usuario;

    // Constructors
    public HabilidadUsuario() {
    }

    public HabilidadUsuario(Long habilidad_usuario_id, @NotNull Habilidad habilidad, @NotNull Usuario usuario) {
        this.habilidad_usuario_id = habilidad_usuario_id;
        this.habilidad = habilidad;
        this.usuario = usuario;
    }

    // Getters and Setters

    public Long getHabilidad_usuario_id() {
        return habilidad_usuario_id;
    }

    public void setHabilidad_usuario_id(Long habilidad_usuario_id) {
        this.habilidad_usuario_id = habilidad_usuario_id;
    }

    public Habilidad getHabilidad() {
        return habilidad;
    }

    public void setHabilidad(Habilidad habilidad) {
        this.habilidad = habilidad;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    @Override
    public String toString() {
        return "HabilidadUsuario {id=" + habilidad_usuario_id + ", habilidad=" + habilidad + ", usuario=" + usuario
                + "}";
    }
}
