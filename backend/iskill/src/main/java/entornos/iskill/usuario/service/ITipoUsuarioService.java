package entornos.iskill.usuario.service;

import java.util.List;
import java.util.Optional;

import entornos.iskill.usuario.model.TipoUsuario;

public interface ITipoUsuarioService {
    List<TipoUsuario> getAll();

    TipoUsuario create(TipoUsuario usuario);

    TipoUsuario update(TipoUsuario usuario);

    Optional<TipoUsuario> findById(Long id);

    void delete(Long id);
}
