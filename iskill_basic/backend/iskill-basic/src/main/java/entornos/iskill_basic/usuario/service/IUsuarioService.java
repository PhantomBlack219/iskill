package entornos.iskill_basic.usuario.service;

import java.util.List;
import java.util.Optional;

import entornos.iskill_basic.usuario.model.Usuario;

public interface IUsuarioService {
    List<Usuario> getAll();

    Usuario create(Usuario usuario);

    Usuario update(Usuario usuario);

    Optional<Usuario> findById(Long id);

    void delete(Long id);
}
