package entornos.iskill_basic.feedback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import entornos.iskill_basic.feedback.model.FeedbackUsuario;

public interface FeedbackUsuarioRepository extends JpaRepository<FeedbackUsuario, Long> {
}
