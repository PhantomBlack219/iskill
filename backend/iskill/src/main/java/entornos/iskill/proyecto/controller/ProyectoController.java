package entornos.iskill.proyecto.controller;

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

import entornos.iskill.proyecto.service.ProyectoService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import entornos.iskill.proyecto.model.Proyecto;


@RestController
@RequestMapping("/api/proyecto")
public class ProyectoController {
    @Autowired
    ProyectoService ProyectoService;

    /**
     * Se obtiene la lista de tipos de usuario
     * 
     * @return lista de tipos de usuario
     */
    @GetMapping("/list")
    @SecurityRequirement(name = "bearerAuth")
    public List<Proyecto> getProyectos() {
        return ProyectoService.getAll();
    }

    /**
     * Se obtiene un tipo de usuario por su id
     * 
     * @param id id del tipo de usuario
     * @return tipo de usuario
     */
    @GetMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Proyecto> findById(@PathVariable Long id) {
        return ProyectoService.findById(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Se crea un nuevo tipo de usuario
     * 
     * @param Proyecto tipo de usuario a crear
     * @return tipo de usuario creado
     */
    @PostMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Proyecto> newProyecto(@RequestBody Proyecto Proyecto) {
        return ResponseEntity.ok(ProyectoService.create(Proyecto));
    }

    /**
     * Se actualiza un tipo de usuario
     * 
     * @param Proyecto tipo de usuario a actualizar
     * @return tipo de usuario actualizado
     */
    @PutMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Proyecto> updateProyecto(@RequestBody Proyecto Proyecto) {
        return ProyectoService.findById(Proyecto.getProyecto_id())
            .map(tu -> ResponseEntity.ok(ProyectoService.update(Proyecto)))
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
    public ResponseEntity<?> deleteProyecto(@PathVariable Long id) {
        return ProyectoService.findById(id)
            .map(tu -> {
                ProyectoService.delete(id);
                return ResponseEntity.ok().build();
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/usuario_id/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public List<Proyecto> getProyectosByUsuarioId(@PathVariable Long id) {
        return ProyectoService.getProyectosByUsuarioId(id);
    }
    
}
