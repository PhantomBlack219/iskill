package entornos.iskill_basic.vacante.controller;

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

import entornos.iskill_basic.vacante.service.VacanteService;
import entornos.iskill_basic.vacante.model.Vacante;

@RestController
@RequestMapping("/api/vacante")
public class VacanteController {
    @Autowired
    VacanteService VacanteService;

    /**
     * Se obtiene la lista de tipos de usuario
     * 
     * @return lista de tipos de usuario
     */
    @GetMapping("/list")
    public List<Vacante> getVacantes() {
        return VacanteService.getAll();
    }

    /**
     * Se obtiene un tipo de usuario por su id
     * 
     * @param id id del tipo de usuario
     * @return tipo de usuario
     */
    @GetMapping("/{id}")
    public ResponseEntity<Vacante> findById(@PathVariable Long id) {
        return VacanteService.findById(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Se crea un nuevo tipo de usuario
     * 
     * @param Vacante tipo de usuario a crear
     * @return tipo de usuario creado
     */
    @PostMapping
    public ResponseEntity<Vacante> newVacante(@RequestBody Vacante Vacante) {
        return ResponseEntity.ok(VacanteService.create(Vacante));
    }

    /**
     * Se actualiza un tipo de usuario
     * 
     * @param Vacante tipo de usuario a actualizar
     * @return tipo de usuario actualizado
     */
    @PutMapping
    public ResponseEntity<Vacante> updateVacante(@RequestBody Vacante Vacante) {
        return VacanteService.findById(Vacante.getVacante_id())
            .map(tu -> ResponseEntity.ok(VacanteService.update(Vacante)))
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Se elimina un tipo de usuario
     * 
     * @param id id del tipo de usuario a eliminar
     * @return tipo de usuario eliminado
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVacante(@PathVariable Long id) {
        return VacanteService.findById(id)
            .map(tu -> {
                VacanteService.delete(id);
                return ResponseEntity.ok().build();
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
