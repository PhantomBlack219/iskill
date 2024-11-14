package entornos.iskill_basic.proyecto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import entornos.iskill_basic.proyecto.model.EstadoVacante;
import entornos.iskill_basic.proyecto.model.Vacante;

public interface VacanteRepository extends JpaRepository<Vacante, Long> {

    @Query("SELECT COUNT(*) FROM Vacante v WHERE v.estado = :estado AND v.vacante_id = :id")
    Long countVacantesByEstadoAndVacanteId(@Param("estado") EstadoVacante estado, @Param("id") Long id);

    @Query("SELECT COUNT(*) FROM Vacante v WHERE v.vacante_id = :id")
    Long countVacantesByVacanteId(@Param("id") Long id);
}
