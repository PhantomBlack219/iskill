package entornos.iskill_basic.proyecto.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import entornos.iskill_basic.proyecto.model.Proyecto;

public interface ProyectoRepository extends JpaRepository<Proyecto, Long>{
    @Query("SELECT p FROM Proyecto p WHERE p.usuario_id.usuario_id = :id")
    List<Proyecto> getProyectosByUsuarioId(@Param("id") Long id);
}


