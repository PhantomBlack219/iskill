package entornos.iskill_basic.usuario.controller;

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

import entornos.iskill_basic.usuario.model.TipoUsuario;
import entornos.iskill_basic.usuario.service.TipoUsuarioService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api/tipo_usuario")
public class TipoUsuarioController {
    @Autowired
    TipoUsuarioService tipoUsuarioService;

    /**
     * Se obtiene la lista de tipos de usuario
     * 
     * @return lista de tipos de usuario
     */
    @GetMapping("/list")
    public List<TipoUsuario> getTipoUsuarios() {
        return tipoUsuarioService.getAll();
    }

    /**
     * Se obtiene un tipo de usuario por su id
     * 
     * @param id id del tipo de usuario
     * @return tipo de usuario
     */
    @GetMapping("/{id}")
    public ResponseEntity<TipoUsuario> findById(@PathVariable Long id) {
        return tipoUsuarioService.findById(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Se crea un nuevo tipo de usuario
     * 
     * @param tipoUsuario tipo de usuario a crear
     * @return tipo de usuario creado
     */
    @PostMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<TipoUsuario> newTipoUsuario(@RequestBody TipoUsuario tipoUsuario) {
        return ResponseEntity.ok(tipoUsuarioService.create(tipoUsuario));
    }

    /**
     * Se actualiza un tipo de usuario
     * 
     * @param tipoUsuario tipo de usuario a actualizar
     * @return tipo de usuario actualizado
     */
    @PutMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<TipoUsuario> updateTipoUsuario(@RequestBody TipoUsuario tipoUsuario) {
        return tipoUsuarioService.findById(tipoUsuario.getTipo_usuario_id())
            .map(tu -> ResponseEntity.ok(tipoUsuarioService.update(tipoUsuario)))
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
    public ResponseEntity<?> deleteTipoUsuario(@PathVariable Long id) {
        return tipoUsuarioService.findById(id)
            .map(tu -> {
                tipoUsuarioService.delete(id);
                return ResponseEntity.ok().build();
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
