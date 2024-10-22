package entornos.iskill_basic.feedback.service;

import java.util.List;
import java.util.Optional;

import entornos.iskill_basic.feedback.model.Feedback;

public interface IFeedbackService {

    List<Feedback> getAllFeedback();

    Optional<Feedback> getFeedbackById(Long id);

    Feedback saveFeedback(Feedback feedback);

    void deleteFeedback(Long id);
}
