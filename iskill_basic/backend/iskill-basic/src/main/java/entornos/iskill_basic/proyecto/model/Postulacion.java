package entornos.iskill_basic.proyecto.model;

import java.sql.Date;

import entornos.iskill_basic.usuario.model.Usuario;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "postulacion")
public class Postulacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postulacion_id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    @NotNull
    private Usuario usuario_id;


    @ManyToOne
    @JoinColumn(name = "vacante_id")
    @NotNull
    private Vacante vacante_id;

    @Column
    @NotNull
    private Estado estado;

    @Column
    @NotNull
    private Date fecha_postulacion;

    public Postulacion() {
    }

    public Postulacion(Long postulacion_id, @NotNull Usuario usuario_id, @NotNull Vacante vacante_id,
            @NotNull Estado estado, @NotNull Date fecha_postulacion) {
        this.postulacion_id = postulacion_id;
        this.usuario_id = usuario_id;
        this.vacante_id = vacante_id;
        this.estado = estado;
        this.fecha_postulacion = fecha_postulacion;
    }

    public Long getPostulacion_id() {
        return postulacion_id;
    }

    public void setPostulacion_id(Long postulacion_id) {
        this.postulacion_id = postulacion_id;
    }

    public Usuario getUsuario_id() {
        return usuario_id;
    }

    public void setUsuario_id(Usuario usuario_id) {
        this.usuario_id = usuario_id;
    }

    public Vacante getVacante_id() {
        return vacante_id;
    }

    public void setVacante_id(Vacante vacante_id) {
        this.vacante_id = vacante_id;
    }

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public Date getFecha_postulacion() {
        return fecha_postulacion;
    }

    public void setFecha_postulacion(Date fecha_postulacion) {
        this.fecha_postulacion = fecha_postulacion;
    }
}