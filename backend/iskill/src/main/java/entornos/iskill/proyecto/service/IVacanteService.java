package entornos.iskill.proyecto.service;

import java.util.List;
import java.util.Optional;

import entornos.iskill.proyecto.model.EstadoVacante;
import entornos.iskill.proyecto.model.Vacante;

public interface IVacanteService {
    List<Vacante> getAll();

    Vacante create(Vacante vacante);

    Vacante update(Vacante vacante);

    Optional<Vacante> findById(Long id);

    void delete(Long id);

    List<Vacante> getVacantesByProyectoId(Long id);

    List<Vacante> getVacantesByUsuarioId(Long id);

    Long countVacantesByEstadoAndVacanteId(EstadoVacante estado, Long id);

    Long countVacantesByVacanteId(Long id);

}
