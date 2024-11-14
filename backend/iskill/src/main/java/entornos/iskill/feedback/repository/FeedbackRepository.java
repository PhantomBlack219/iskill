package entornos.iskill.feedback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import entornos.iskill.feedback.model.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
}

