package entornos.iskill_basic.usuario.repository;

import entornos.iskill_basic.usuario.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

}
