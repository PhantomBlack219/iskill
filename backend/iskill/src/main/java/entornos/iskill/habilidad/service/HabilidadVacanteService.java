package entornos.iskill.habilidad.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import entornos.iskill.habilidad.model.HabilidadVacante;
import entornos.iskill.habilidad.repository.HabilidadVacanteRepository;

@Service
@Transactional
public class HabilidadVacanteService implements IHabilidadVacanteService {
    
    @Autowired
    HabilidadVacanteRepository habilidadVacanteRepository;

    @Override
    public List<HabilidadVacante> getAll() {
        return habilidadVacanteRepository.findAll();
    }

    @Override
    public HabilidadVacante create(HabilidadVacante habilidadVacante) {
        return habilidadVacanteRepository.save(habilidadVacante);
    }

    @Override
    public HabilidadVacante update(HabilidadVacante habilidadVacante) {
        return habilidadVacanteRepository.save(habilidadVacante);
    }

    @Override
    public Optional<HabilidadVacante> findById(Long id) {
        return habilidadVacanteRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        habilidadVacanteRepository.deleteById(id);
    }

    @Override
    public List<HabilidadVacante> createHabilidadesVacante(List<HabilidadVacante> habilidadesVacante){
        return habilidadVacanteRepository.saveAll(habilidadesVacante);
    }

}
