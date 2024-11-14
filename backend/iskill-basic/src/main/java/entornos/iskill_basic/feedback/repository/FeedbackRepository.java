package entornos.iskill_basic.feedback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import entornos.iskill_basic.feedback.model.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
}

