package entornos.iskill_basic.feedback.service;

import java.util.List;
import java.util.Optional;

import entornos.iskill_basic.feedback.model.Feedback;

public interface IFeedbackService {

    List<Feedback> getAll();

    Optional<Feedback> findById(Long id);

    Feedback create(Feedback feedback);

    Feedback update(Feedback feedback);

    void delete(Long id);
}
