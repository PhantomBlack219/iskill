package entornos.iskill.proyecto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import entornos.iskill.proyecto.model.EstadoPostulacion;
import entornos.iskill.proyecto.model.Postulacion;

public interface PostulacionRepository extends JpaRepository<Postulacion, Long>{
    @Query("SELECT COUNT(*) FROM Postulacion p WHERE p.estado = :estado AND p.vacante_id.vacante_id = :id")
    Long countPostulacionByEstadoAndVacanteId(@Param("estado") EstadoPostulacion estado, @Param("id") Long id);

    @Query("SELECT COUNT(*) FROM Postulacion p WHERE p.vacante_id.vacante_id = :id")
    Long countPostulacionByVacanteId(@Param("id") Long id);
}


