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

import entornos.iskill.habilidad.model.HabilidadUsuario;
import entornos.iskill.habilidad.service.HabilidadUsuarioService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api/habilidad_usuario")
public class HabilidadUsuarioController {

    @Autowired
    HabilidadUsuarioService habilidadUsuarioService;

    /**
     * Se obtiene la lista de habilidades de usuario
     * 
     * @return lista de habilidades de usuario
     */
    @GetMapping("/list")
    @SecurityRequirement(name = "bearerAuth")
    public List<HabilidadUsuario> getHabilidadUsuarios() {
        return habilidadUsuarioService.getAll();
    }

    /**
     * Se obtiene una habilidad de usuario por su id
     * 
     * @param id id de la habilidad de usuario
     * @return habilidad de usuario
     */
    @GetMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<HabilidadUsuario> findById(@PathVariable Long id) {
        return habilidadUsuarioService.findById(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Se crea una nueva habilidad de usuario
     * 
     * @param habilidadUsuario habilidad de usuario a crear
     * @return habilidad de usuario creada
     */
    @PostMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<HabilidadUsuario> newHabilidadUsuario(@RequestBody HabilidadUsuario habilidadUsuario) {
        return ResponseEntity.ok(habilidadUsuarioService.create(habilidadUsuario));
    }

    /**
     * Se actualiza una habilidad de usuario
     * 
     * @param habilidadUsuario habilidad de usuario a actualizar
     * @return habilidad de usuario actualizada
     */
    @PutMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<HabilidadUsuario> updateHabilidadUsuario(@RequestBody HabilidadUsuario habilidadUsuario) {
        return habilidadUsuarioService.findById(habilidadUsuario.getHabilidad_usuario_id())
            .map(hu -> ResponseEntity.ok(habilidadUsuarioService.update(habilidadUsuario)))
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Se elimina una habilidad de usuario
     * 
     * @param id id de la habilidad de usuario a eliminar
     * @return respuesta de eliminación
     */
    @DeleteMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> deleteHabilidadUsuario(@PathVariable Long id) {
        return habilidadUsuarioService.findById(id)
            .map(hu -> {
                habilidadUsuarioService.delete(id);
                return ResponseEntity.ok().build();
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
