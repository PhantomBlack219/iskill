package entornos.iskill.habilidad.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import entornos.iskill.habilidad.model.HabilidadVacante;
import entornos.iskill.habilidad.service.HabilidadVacanteService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api/habilidad_vacante")
public class HabilidadVacanteController {

    @Autowired
    HabilidadVacanteService habilidadVacanteService;

    /**
     * Se obtiene la lista de habilidades de vacante
     * 
     * @return lista de habilidades de vacante
     */
    @GetMapping("/list")
    @SecurityRequirement(name = "bearerAuth")
    public List<HabilidadVacante> getHabilidadVacantes() {
        return habilidadVacanteService.getAll();
    }

    /**
     * Se obtiene una habilidad de vacante por su id
     * 
     * @param id id de la habilidad de vacante
     * @return habilidad de vacante
     */
    @GetMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<HabilidadVacante> findById(@PathVariable Long id) {
        return habilidadVacanteService.findById(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Se crea una nueva habilidad de vacante
     * 
     * @param habilidadVacante habilidad de vacante a crear
     * @return habilidad de vacante creada
     */
    @PostMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<HabilidadVacante> newHabilidadVacante(@RequestBody HabilidadVacante habilidadVacante) {
        return ResponseEntity.ok(habilidadVacanteService.create(habilidadVacante));
    }

    /**
     * Se actualiza una habilidad de vacante
     * 
     * @param habilidadVacante habilidad de vacante a actualizar
     * @return habilidad de vacante actualizada
     */
    @PutMapping
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<HabilidadVacante> updateHabilidadVacante(@RequestBody HabilidadVacante habilidadVacante) {
        return habilidadVacanteService.findById(habilidadVacante.getHabilidad_vacante_id())
            .map(hu -> ResponseEntity.ok(habilidadVacanteService.update(habilidadVacante)))
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Se elimina una habilidad de vacante
     * 
     * @param id id de la habilidad de vacante a eliminar
     * @return respuesta de eliminación
     */
    @DeleteMapping("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> deleteHabilidadVacante(@PathVariable Long id) {
        return habilidadVacanteService.findById(id)
            .map(hu -> {
                habilidadVacanteService.delete(id);
                return ResponseEntity.ok().build();
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/createHabilidades")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> addMultipleHabilidadesVacante(@RequestBody List<HabilidadVacante> habilidadesVacanteList){
        return new ResponseEntity<>(habilidadVacanteService.createHabilidadesVacante(habilidadesVacanteList), HttpStatus.OK);
    }
}
