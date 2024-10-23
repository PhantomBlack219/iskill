package entornos.iskill_basic.habilidad.model;

import entornos.iskill_basic.proyecto.model.Vacante;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "habilidad_vacante")
public class HabilidadVacante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long habilidad_vacante_id;

    @ManyToOne
    @JoinColumn(name = "habilidad_id")
    @NotNull
    private Habilidad habilidad;

    @ManyToOne
    @JoinColumn(name = "vacante_id")
    @NotNull
    private Vacante vacante;

    // Constructors
    public HabilidadVacante() {
    }

    public HabilidadVacante(Long habilidad_vacante_id, @NotNull Habilidad habilidad, @NotNull Vacante vacante) {
        this.habilidad_vacante_id = habilidad_vacante_id;
        this.habilidad = habilidad;
        this.vacante = vacante;
    }

    // Getters and Setters
    public Long getHabilidad_vacante_id() {
        return habilidad_vacante_id;
    }

    public void setHabilidad_vacante_id(Long habilidad_vacante_id) {
        this.habilidad_vacante_id = habilidad_vacante_id;
    }

    public Habilidad getHabilidad() {
        return habilidad;
    }

    public void setHabilidad(Habilidad habilidad) {
        this.habilidad = habilidad;
    }

    public Vacante getVacante() {
        return vacante;
    }

    public void setVacante(Vacante vacante) {
        this.vacante = vacante;
    }

    @Override
    public String toString() {
        return "HabilidadVacante{" +
                "habilidad_vacante_id=" + habilidad_vacante_id +
                ", habilidad=" + habilidad +
                ", vacante=" + vacante +
                '}';
    }
}
