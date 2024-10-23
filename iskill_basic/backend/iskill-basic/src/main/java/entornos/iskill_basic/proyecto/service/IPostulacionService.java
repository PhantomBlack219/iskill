package entornos.iskill_basic.proyecto.service;

import java.util.List;
import java.util.Optional;

import entornos.iskill_basic.proyecto.model.Postulacion;

public interface IPostulacionService {
    List<Postulacion> getAll();

    Postulacion create(Postulacion Postulacion);

    Postulacion update(Postulacion Postulacion);

    Optional<Postulacion> findById(Long id);

    void delete(Long id);
}
