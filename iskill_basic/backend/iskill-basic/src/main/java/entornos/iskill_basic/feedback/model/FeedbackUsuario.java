package entornos.iskill_basic.feedback.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import entornos.iskill_basic.usuario.model.Usuario;

@Entity
@Table(name = "feedback_usuario")
public class FeedbackUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uniqueId;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    @NotNull
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "feedback_id")
    @NotNull
    private Feedback feedback;

    private String tipo;

    // Constructors

    public FeedbackUsuario() {
    }

    public FeedbackUsuario(@NotNull Usuario usuario, @NotNull Feedback feedback, String tipo) {
        this.usuario = usuario;
        this.feedback = feedback;
        this.tipo = tipo;
    }

    public Long getUniqueId() {
        return uniqueId;
    }

    public void setUniqueId(Long uniqueId) {
        this.uniqueId = uniqueId;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Feedback getFeedback() {
        return feedback;
    }

    public void setFeedback(Feedback feedback) {
        this.feedback = feedback;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

}

