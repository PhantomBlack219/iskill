package entornos.iskill.habilidad.service;

import java.util.List;
import java.util.Optional;

import entornos.iskill.habilidad.model.HabilidadUsuario;

public interface IHabilidadUsuarioService {
    List<HabilidadUsuario> getAll();

    HabilidadUsuario create(HabilidadUsuario habilidadUsuario);

    HabilidadUsuario update(HabilidadUsuario habilidadUsuario);

    Optional<HabilidadUsuario> findById(Long id);

    void delete(Long id);
}
