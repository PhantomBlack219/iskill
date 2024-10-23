package entornos.iskill_basic.proyecto.controller;

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

import entornos.iskill_basic.proyecto.model.Postulacion;
import entornos.iskill_basic.proyecto.service.PostulacionService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api/postulacion")
public class PostulacionController {
    @Autowired
    PostulacionService PostulacionService;

    /**
     * Se obtiene la lista de tipos de usuario
     * 
     * @return lista de tipos de usuario
     */
    @GetMapping("/list")
    @SecurityRequirement(name = "bearerAuth")
    public List<Postulacion> getPostulacions() {
        return PostulacionService.getAll();
    }

    /**
     * Se obtiene un tipo de usuario por su id
     * 
     * @param id id del tipo de usuario
     * @return tipo de usuario
     */
    @GetMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Postulacion> findById(@PathVariable Long id) {
        return PostulacionService.findById(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Se crea un nuevo tipo de usuario
     * 
     * @param Postulacion tipo de usuario a crear
     * @return tipo de usuario creado
     */
    @PostMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Postulacion> newPostulacion(@RequestBody Postulacion Postulacion) {
        return ResponseEntity.ok(PostulacionService.create(Postulacion));
    }

    /**
     * Se actualiza un tipo de usuario
     * 
     * @param Postulacion tipo de usuario a actualizar
     * @return tipo de usuario actualizado
     */
    @PutMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Postulacion> updatePostulacion(@RequestBody Postulacion Postulacion) {
        return PostulacionService.findById(Postulacion.getPostulacion_id())
            .map(tu -> ResponseEntity.ok(PostulacionService.update(Postulacion)))
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Se elimina un tipo de usuario
     * 
     * @param id id del tipo de usuario a eliminar
     * @return tipo de usuario eliminado
     */
    @DeleteMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> deletePostulacion(@PathVariable Long id) {
        return PostulacionService.findById(id)
            .map(tu -> {
                PostulacionService.delete(id);
                return ResponseEntity.ok().build();
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
