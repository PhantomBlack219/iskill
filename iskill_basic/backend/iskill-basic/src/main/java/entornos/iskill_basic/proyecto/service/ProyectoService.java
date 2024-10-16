package entornos.iskill_basic.proyecto.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import entornos.iskill_basic.proyecto.model.Proyecto;
import entornos.iskill_basic.proyecto.repository.ProyectoRepository;

@Service
@Transactional
public class ProyectoService implements IProyectoService {
    @Autowired
    ProyectoRepository ProyectoRepository;

    @Override
    public List<Proyecto> getAll() {
        return ProyectoRepository.findAll();
    }

    @Override
    public Proyecto create(Proyecto Proyecto){
        return ProyectoRepository.save(Proyecto);
    }

    @Override
    public Proyecto update(Proyecto Proyecto) {
        return ProyectoRepository.save(Proyecto);
    }

    @Override
    public Optional<Proyecto> findById(Long id) {
        return ProyectoRepository.findById(id);
    }

    @Override
    public void delete(Long id){
        ProyectoRepository.deleteById(id);
        return;
    }
}
