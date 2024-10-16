package entornos.iskill_basic.vacante.service;

import java.util.List;
import java.util.Optional;

import entornos.iskill_basic.vacante.model.Vacante;

public interface IVacanteService {
    List<Vacante> getAll();

    Vacante create(Vacante vacante);

    Vacante update(Vacante vacante);

    Optional<Vacante> findById(Long id);

    void delete(Long id);
}
