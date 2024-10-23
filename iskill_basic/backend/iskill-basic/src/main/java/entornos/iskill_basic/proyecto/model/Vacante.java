package entornos.iskill_basic.proyecto.model;

import java.sql.Date;

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
@Table(name = "vacante")
public class Vacante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vacante_id;

    @ManyToOne
    @JoinColumn(name = "proyecto_id")
    @NotNull
    private Proyecto proyecto_id;

    @Column
    @NotNull
    private String nombre_vacante;

    @Column
    @NotNull
    private String descripcion;

    @Column
    @NotNull
    private int puestos_disponibles;

    @Column
    @NotNull
    private int puntos;

    @Column
    private EstadoVacante estado;

    @Column
    private Date fecha_inicio_vacante;

    @Column
    private Date fecha_fin_vacante;


    // Constructors

    public Vacante() {
    }


    public Vacante(Long vacante_id, @NotNull Proyecto proyecto_id, @NotNull String nombre_vacante,
            @NotNull String descripcion, @NotNull int puestos_disponibles,
            @NotNull int puntos, EstadoVacante estado, Date fecha_inicio_vacante, Date fecha_fin_vacante) {
        this.vacante_id = vacante_id;
        this.proyecto_id = proyecto_id;
        this.nombre_vacante = nombre_vacante;
        this.descripcion = descripcion;
        this.puestos_disponibles = puestos_disponibles;
        this.puntos = puntos;
        this.estado = estado;
        this.fecha_inicio_vacante = fecha_inicio_vacante;
        this.fecha_fin_vacante = fecha_fin_vacante;
    }


    public Long getVacante_id() {
        return vacante_id;
    }


    public void setVacante_id(Long vacante_id) {
        this.vacante_id = vacante_id;
    }


    public Proyecto getProyecto_id() {
        return proyecto_id;
    }


    public void setProyecto_id(Proyecto proyecto_id) {
        this.proyecto_id = proyecto_id;
    }


    public String getNombre_vacante() {
        return nombre_vacante;
    }


    public void setNombre_vacante(String nombre_vacante) {
        this.nombre_vacante = nombre_vacante;
    }


    public String getDescripcion() {
        return descripcion;
    }


    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public int getPuestos_disponibles() {
        return puestos_disponibles;
    }


    public void setPuestos_disponibles(int puestos_disponibles) {
        this.puestos_disponibles = puestos_disponibles;
    }


    public int getPuntos() {
        return puntos;
    }


    public void setPuntos(int puntos) {
        this.puntos = puntos;
    }

    public EstadoVacante getEstado() {
        return estado;
    }

    public void setEstado(EstadoVacante estado) {
        this.estado = estado;
    }

    public Date getFecha_inicio_vacante() {
        return fecha_inicio_vacante;
    }

    public void setFecha_inicio_vacante(Date fecha_inicio_vacante) {
        this.fecha_inicio_vacante = fecha_inicio_vacante;
    }

    public Date getFecha_fin_vacante() {
        return fecha_fin_vacante;
    }

    public void setFecha_fin_vacante(Date fecha_fin_vacante) {
        this.fecha_fin_vacante = fecha_fin_vacante;
    }
}
