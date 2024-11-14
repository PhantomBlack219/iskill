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

import entornos.iskill_basic.proyecto.model.EstadoVacante;
import entornos.iskill_basic.proyecto.model.Vacante;
import entornos.iskill_basic.proyecto.service.VacanteService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api/vacante")
public class VacanteController {
    @Autowired
    VacanteService VacanteService;

    /**
     * Se obtiene la lista de vacantes
     * 
     * @return lista de vacantes
     */
    @GetMapping("/list")
    @SecurityRequirement(name = "bearerAuth")
    public List<Vacante> getVacantes() {
        return VacanteService.getAll();
    }

    /**
     * Se obtiene un vacante por su id
     * 
     * @param id id del vacante
     * @return vacante
     */
    @GetMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Vacante> findById(@PathVariable Long id) {
        return VacanteService.findById(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Se crea un nuevo vacante
     * 
     * @param Vacante vacante a crear
     * @return vacante creado
     */
    @PostMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Vacante> newVacante(@RequestBody Vacante Vacante) {
        return ResponseEntity.ok(VacanteService.create(Vacante));
    }

    /**
     * Se actualiza un vacante
     * 
     * @param Vacante vacante a actualizar
     * @return vacante actualizado
     */
    @PutMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Vacante> updateVacante(@RequestBody Vacante Vacante) {
        return VacanteService.findById(Vacante.getVacante_id())
            .map(tu -> ResponseEntity.ok(VacanteService.update(Vacante)))
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Se elimina un vacante
     * 
     * @param id id del vacante a eliminar
     * @return vacante eliminado
     */
    @DeleteMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> deleteVacante(@PathVariable Long id) {
        return VacanteService.findById(id)
            .map(tu -> {
                VacanteService.delete(id);
                return ResponseEntity.ok().build();
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Devuelve la cantidad de registros de un proyecto según el estado
     * 
     * @param estado estado de la vacante
     * @param vacanteId id de la vacante
     * 
     * @return cantidad de registros
     */
    @GetMapping("/count/estado/{estado}/vacante/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Long> getVacantesCountByEstadoAndVacanteId(@PathVariable EstadoVacante estado, @PathVariable Long id){
        Long count = VacanteService.countVacantesByEstadoAndVacanteId(estado, id);
        return ResponseEntity.ok(count);
    }

    /**
     * Devuelve la cantidad de registros de un proyecto según el estado
     * 
     * @param estado estado de la vacante
     * @param vacanteId id de la vacante
     * 
     * @return cantidad de registros
     */
    @GetMapping("/count/vacante/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<Long> getVacantesCountByVacanteId(@PathVariable Long id){
        Long count = VacanteService.countVacantesByVacanteId(id);
        return ResponseEntity.ok(count);
    }
}
