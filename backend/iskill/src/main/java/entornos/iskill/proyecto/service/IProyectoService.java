package entornos.iskill.proyecto.service;

import java.util.List;
import java.util.Optional;

import entornos.iskill.proyecto.model.Proyecto;

public interface IProyectoService {
    List<Proyecto> getAll();

    Proyecto create(Proyecto proyecto);

    Proyecto update(Proyecto proyecto);

    Optional<Proyecto> findById(Long id);

    void delete(Long id);

    List<Proyecto> getProyectosByUsuarioId(Long id);
}
