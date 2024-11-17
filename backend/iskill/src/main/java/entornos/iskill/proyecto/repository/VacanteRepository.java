package entornos.iskill.proyecto.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import entornos.iskill.proyecto.model.EstadoVacante;
import entornos.iskill.proyecto.model.Vacante;

public interface VacanteRepository extends JpaRepository<Vacante, Long> {
    @Query("SELECT v FROM Vacante v WHERE v.proyecto_id.proyecto_id = :id")
    List<Vacante> getVacantesByProyectoId(@Param("id") Long id);

    @Query("SELECT COUNT(*) FROM Vacante v WHERE v.estado = :estado AND v.vacante_id = :id")
    Long countVacantesByEstadoAndVacanteId(@Param("estado") EstadoVacante estado, @Param("id") Long id);

    @Query("SELECT COUNT(*) FROM Vacante v WHERE v.vacante_id = :id")
    Long countVacantesByVacanteId(@Param("id") Long id);
}
