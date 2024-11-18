package entornos.iskill.proyecto.model;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import entornos.iskill.habilidad.model.HabilidadVacante;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
    private String nombre;

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
    @Enumerated(EnumType.STRING)
    private EstadoVacante estado;

    @Column
    private Date fecha_inicio;

    @Column
    private Date fecha_fin;

    @OneToMany(mappedBy = "vacante", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<HabilidadVacante> habilidadesVacantes;


    // Constructors

    public Vacante() {
    }


    public Vacante(Long vacante_id, @NotNull Proyecto proyecto_id, @NotNull String nombre,
            @NotNull String descripcion, @NotNull int puestos_disponibles,
            @NotNull int puntos, EstadoVacante estado, Date fecha_inicio, Date fecha_fin) {
        this.vacante_id = vacante_id;
        this.proyecto_id = proyecto_id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.puestos_disponibles = puestos_disponibles;
        this.puntos = puntos;
        this.estado = estado;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
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

    public Date getFecha_inicio() {
        return fecha_inicio;
    }

    public void setFecha_inicio(Date fecha_inicio) {
        this.fecha_inicio = fecha_inicio;
    }

    public Date getFecha_fin() {
        return fecha_fin;
    }

    public void setFecha_fin(Date fecha_fin) {
        this.fecha_fin = fecha_fin;
    }

    public List<HabilidadVacante> getHabilidadesVacantes() {
        return habilidadesVacantes;
    }

    public void setHabilidadesVacantes(List<HabilidadVacante> habilidadesVacantes) {
        this.habilidadesVacantes = habilidadesVacantes;
    }
}
