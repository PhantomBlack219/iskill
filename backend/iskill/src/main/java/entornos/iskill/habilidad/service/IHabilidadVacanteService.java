package entornos.iskill.habilidad.service;

import java.util.List;
import java.util.Optional;

import entornos.iskill.habilidad.model.HabilidadVacante;

public interface IHabilidadVacanteService {
    List<HabilidadVacante> getAll();

    HabilidadVacante create(HabilidadVacante habilidadVacante);

    HabilidadVacante update(HabilidadVacante habilidadVacante);

    Optional<HabilidadVacante> findById(Long id);

    void delete(Long id);

    List<HabilidadVacante> createHabilidadesVacante(List<HabilidadVacante> habilidadesVacante);
}
