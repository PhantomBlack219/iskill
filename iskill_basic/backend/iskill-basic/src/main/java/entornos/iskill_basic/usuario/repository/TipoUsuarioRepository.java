package entornos.iskill_basic.usuario.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import entornos.iskill_basic.usuario.model.TipoUsuario;

public interface TipoUsuarioRepository extends JpaRepository<TipoUsuario, Long> {

}
