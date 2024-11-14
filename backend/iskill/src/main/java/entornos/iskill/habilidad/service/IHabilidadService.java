package entornos.iskill.habilidad.service;

import java.util.List;
import java.util.Optional;

import entornos.iskill.habilidad.model.Habilidad;

public interface IHabilidadService {
    List<Habilidad> getAll();

    Habilidad create(Habilidad habilidad);

    Habilidad update(Habilidad habilidad);

    Optional<Habilidad> findById(Long id);

    void delete(Long id);
}
