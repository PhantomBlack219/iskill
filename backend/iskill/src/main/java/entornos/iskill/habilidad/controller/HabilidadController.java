package entornos.iskill.habilidad.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import entornos.iskill.habilidad.model.Habilidad;
import entornos.iskill.habilidad.service.HabilidadService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api/habilidad")
public class HabilidadController {

    @Autowired
    HabilidadService habilidadService;

    /**
     * Se obtiene la lista de habilidades
     * 
     * @return lista de habilidades
     */
    @GetMapping("/list")
    @SecurityRequirement(name = "bearerAuth")
    public List<Habilidad> getHabilidades() {
        return habilidadService.getAll();
    }

    /**
     * Se obtiene una habilidad por su id
     * 
     * @param id id de la habilidad
     * @return habilidad
     */
    @GetMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Habilidad> findById(@PathVariable Long id) {
        return habilidadService.findById(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Se crea una nueva habilidad
     * 
     * @param habilidad habilidad a crear
     * @return habilidad creada
     */
    @PostMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Habilidad> newHabilidad(@RequestBody Habilidad habilidad) {
        return ResponseEntity.ok(habilidadService.create(habilidad));
    }

    /**
     * Se actualiza una habilidad
     * 
     * @param habilidad habilidad a actualizar
     * @return habilidad actualizada
     */
    @PutMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Habilidad> updateHabilidad(@RequestBody Habilidad habilidad) {
        return habilidadService.findById(habilidad.getHabilidad_id())
            .map(h -> ResponseEntity.ok(habilidadService.update(habilidad)))
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Se elimina una habilidad
     * 
     * @param id id de la habilidad a eliminar
     * @return respuesta de eliminación
     */
    @DeleteMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> deleteHabilidad(@PathVariable Long id) {
        return habilidadService.findById(id)
            .map(h -> {
                habilidadService.delete(id);
                return ResponseEntity.ok().build();
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
