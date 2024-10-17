package entornos.iskill_basic.habilidad.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "habilidad")
public class Habilidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long habilidad_id;

    @Column
    @NotNull
    private String nombre_habilidad;

    // Constructors
    public Habilidad() {
    }

    public Habilidad(Long habilidad_id, @NotNull String nombre_habilidad) {
        this.habilidad_id = habilidad_id;
        this.nombre_habilidad = nombre_habilidad;
    }

    // Getters and Setters

    public Long getHabilidad_id() {
        return habilidad_id;
    }

    public void setHabilidad_id(Long habilidad_id) {
        this.habilidad_id = habilidad_id;
    }

    public String getNombre_habilidad() {
        return nombre_habilidad;
    }

    public void setNombre_habilidad(String nombre_habilidad) {
        this.nombre_habilidad = nombre_habilidad;
    }

    @Override
    public String toString() {
        return "Habilidad {id=" + habilidad_id + ", nombre_habilidad=" + nombre_habilidad + "}";
    }
}

