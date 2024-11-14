package entornos.iskill_basic.usuario.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import entornos.iskill_basic.usuario.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    @Query("SELECT usr FROM Usuario AS usr WHERE usr.usuario = :usuario")
    Optional<Usuario> findByUsuario(@Param("usuario") String usuario);
}
