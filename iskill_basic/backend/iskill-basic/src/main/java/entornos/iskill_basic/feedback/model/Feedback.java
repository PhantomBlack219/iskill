package entornos.iskill_basic.feedback.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import entornos.iskill_basic.vacante.model.Vacante; 

@Entity
@Table(name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedbackId;

    @ManyToOne
    @JoinColumn(name = "vacante_id")
    @NotNull
    private Vacante vacante;

    @NotNull
    private int calificacion;

    private String comentarios;

    @Column(name = "fecha_feedback")
    private LocalDate fechaFeedback;


    public Feedback() {
    }

    public Feedback(@NotNull Vacante vacante, @NotNull int calificacion, String comentarios, LocalDate fechaFeedback) {
        this.vacante = vacante;
        this.calificacion = calificacion;
        this.comentarios = comentarios;
        this.fechaFeedback = fechaFeedback;
    }

    public Long getFeedbackId() {
        return feedbackId;
    }

    public void setFeedbackId(Long feedbackId) {
        this.feedbackId = feedbackId;
    }

    public Vacante getVacante() {
        return vacante;
    }

    public void setVacante(Vacante vacante) {
        this.vacante = vacante;
    }

    public int getCalificacion() {
        return calificacion;
    }

    public void setCalificacion(int calificacion) {
        this.calificacion = calificacion;
    }

    public String getComentarios() {
        return comentarios;
    }

    public void setComentarios(String comentarios) {
        this.comentarios = comentarios;
    }

    public LocalDate getFechaFeedback() {
        return fechaFeedback;
    }

    public void setFechaFeedback(LocalDate fechaFeedback) {
        this.fechaFeedback = fechaFeedback;
    }

}
