package entornos.iskill_basic.vacante.model;

import java.sql.Date;

import entornos.iskill_basic.proyecto.model.Proyecto;
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
    private String habilidades_requeridas;

    @Column
    @NotNull
    private int puestos_disponibles;

    @Column
    @NotNull
    private int puntos;

    @Column
    private Date fecha_creacion;


    // Constructors

    public Vacante() {
    }


    public Vacante(Long vacante_id, @NotNull Proyecto proyecto_id, @NotNull String nombre_vacante,
            @NotNull String descripcion, @NotNull String habilidades_requeridas, @NotNull int puestos_disponibles,
            @NotNull int puntos, Date fecha_creacion) {
        this.vacante_id = vacante_id;
        this.proyecto_id = proyecto_id;
        this.nombre_vacante = nombre_vacante;
        this.descripcion = descripcion;
        this.habilidades_requeridas = habilidades_requeridas;
        this.puestos_disponibles = puestos_disponibles;
        this.puntos = puntos;
        this.fecha_creacion = fecha_creacion;
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


    public String getHabilidades_requeridas() {
        return habilidades_requeridas;
    }


    public void setHabilidades_requeridas(String habilidades_requeridas) {
        this.habilidades_requeridas = habilidades_requeridas;
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


    public Date getFecha_creacion() {
        return fecha_creacion;
    }


    public void setFecha_creacion(Date fecha_creacion) {
        this.fecha_creacion = fecha_creacion;
    }

    

   

}