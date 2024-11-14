package entornos.iskill.habilidad.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import entornos.iskill.habilidad.model.Habilidad;
import entornos.iskill.habilidad.repository.HabilidadRepository;

@Service
@Transactional
public class HabilidadService implements IHabilidadService {

    @Autowired
    HabilidadRepository habilidadRepository;

    @Override
    public List<Habilidad> getAll() {
        return habilidadRepository.findAll();
    }

    @Override
    public Habilidad create(Habilidad habilidad) {
        return habilidadRepository.save(habilidad);
    }

    @Override
    public Habilidad update(Habilidad habilidad) {
        return habilidadRepository.save(habilidad);
    }

    @Override
    public Optional<Habilidad> findById(Long id) {
        return habilidadRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        habilidadRepository.deleteById(id);
    }
}
