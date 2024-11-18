package entornos.iskill.habilidad.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import entornos.iskill.habilidad.model.HabilidadVacante;

public interface HabilidadVacanteRepository extends JpaRepository<HabilidadVacante, Long> {
    @Query("SELECT hv FROM HabilidadVacante hv WHERE hv.vacante.vacante_id = :vacanteId")
    List<HabilidadVacante> findByVacanteId(Long vacanteId);
}
