package entornos.iskill.proyecto.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import entornos.iskill.proyecto.model.EstadoPostulacion;
import entornos.iskill.proyecto.model.Postulacion;
import entornos.iskill.proyecto.repository.PostulacionRepository;

@Service
@Transactional
public class PostulacionService implements IPostulacionService {
    @Autowired
    PostulacionRepository PostulacionRepository;

    @Override
    public List<Postulacion> getAll() {
        return PostulacionRepository.findAll();
    }

    @Override
    public Postulacion create(Postulacion Postulacion) {
        return PostulacionRepository.save(Postulacion);
    }

    @Override
    public Postulacion update(Postulacion Postulacion) {
        return PostulacionRepository.save(Postulacion);
    }

    @Override
    public Optional<Postulacion> findById(Long id) {
        return PostulacionRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        PostulacionRepository.deleteById(id);
        return;
    }

    @Override
    public Long countPostulacionByEstadoAndVacanteId(EstadoPostulacion estado, Long id) {
        return PostulacionRepository.countPostulacionByEstadoAndVacanteId(estado, id);
    }

    @Override
    public Long countPostulacionByVacanteId(Long id){
        return PostulacionRepository.countPostulacionByVacanteId(id);
    }
}
