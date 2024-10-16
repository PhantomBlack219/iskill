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

import entornos.iskill_basic.usuario.model.Usuario;
import entornos.iskill_basic.usuario.service.UsuarioService;

@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {
    @Autowired
    UsuarioService usuarioService;

    /**
     * Se obtiene la lista de usuarios
     * 
     * @return lista de usuarios
     */
    @GetMapping("/list")
    public List<Usuario> getUsuarios() {
        return usuarioService.getAll();
    }

    /**
     * Se obtiene un usuario por su id
     * 
     * @param id id del usuario
     * @return usuario
     */
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> findById(@PathVariable Long id) {
        return usuarioService.findById(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Se crea un nuevo usuario
     * 
     * @param usuario usuario a crear
     * @return usuario creado
     */
    @PostMapping
    public ResponseEntity<Usuario> newUsuario(@RequestBody Usuario usuario) {
        return ResponseEntity.ok(usuarioService.create(usuario));
    }

    /**
     * Se actualiza un usuario
     * 
     * @param usuario usuario a actualizar
     * @return usuario actualizado
     */
    @PutMapping
    public ResponseEntity<Usuario> updateUsuario(@RequestBody Usuario usuario) {
        return usuarioService.findById(usuario.getUsuario_id())
            .map(u -> ResponseEntity.ok(usuarioService.update(usuario)))
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Se elimina un usuario
     * 
     * @param id id del usuario a eliminar
     * @return respuesta de eliminación
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUsuario(@PathVariable Long id) {
        return usuarioService.findById(id)
            .map(u -> {
                usuarioService.delete(id);
                return ResponseEntity.ok().build();
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
