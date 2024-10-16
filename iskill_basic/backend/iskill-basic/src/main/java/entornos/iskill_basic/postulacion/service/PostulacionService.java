package entornos.iskill_basic.postulacion.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import entornos.iskill_basic.postulacion.model.Postulacion;
import entornos.iskill_basic.postulacion.repository.PostulacionRepository;

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
    public Postulacion create(Postulacion Postulacion){
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
    public void delete(Long id){
        PostulacionRepository.deleteById(id);
        return;
    }
}
