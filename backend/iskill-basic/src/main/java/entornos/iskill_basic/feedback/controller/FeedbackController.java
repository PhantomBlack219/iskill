package entornos.iskill_basic.feedback.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import entornos.iskill_basic.feedback.model.Feedback;
import entornos.iskill_basic.feedback.service.FeedbackService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;


    /**
     * Obtiene todos los feedback
     * 
     * @return
     */
    @GetMapping("/list")
    @SecurityRequirement(name = "bearerAuth")
    public List<Feedback> getAllFeedback() {
        return feedbackService.getAll();
    }

    /**
     * Obtiene un feedback por su id
     * 
     * @param id
     * @return
     */
    @GetMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public Optional<Feedback> getFeedbackById(@PathVariable Long id) {
        return feedbackService.findById(id);
    }

    /**
     * Guarda un feedback
     * 
     * @param feedback
     * @return
     */
    @PostMapping
    @SecurityRequirement(name = "bearerAuth")
    public Feedback saveFeedback(@RequestBody Feedback feedback) {
        return feedbackService.create(feedback);
    }

    /**
     * Se actualiza un feedback
     * 
     * @param feedback feedback a actualizar
     * @return feedback actualizado
     */
    @PutMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Feedback> updateFeedback(@RequestBody Feedback feedback) {
        return feedbackService.findById(feedback.getFeedbackId())
            .map(tu -> ResponseEntity.ok(feedbackService.update(feedback)))
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Elimina un feedback
     * 
     * @param id id del feedback a eliminar
     */
    @DeleteMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public void deleteFeedback(@PathVariable Long id) {
        feedbackService.delete(id);
    }
}
