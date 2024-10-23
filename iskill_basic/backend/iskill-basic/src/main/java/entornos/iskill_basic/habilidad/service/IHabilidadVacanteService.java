package entornos.iskill_basic.habilidad.service;

import java.util.List;
import java.util.Optional;

import entornos.iskill_basic.habilidad.model.HabilidadVacante;

public interface IHabilidadVacanteService {
    List<HabilidadVacante> getAll();

    HabilidadVacante create(HabilidadVacante habilidadVacante);

    HabilidadVacante update(HabilidadVacante habilidadVacante);

    Optional<HabilidadVacante> findById(Long id);

    void delete(Long id);
}
