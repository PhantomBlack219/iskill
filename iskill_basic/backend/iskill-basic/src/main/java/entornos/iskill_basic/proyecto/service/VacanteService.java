package entornos.iskill_basic.proyecto.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import entornos.iskill_basic.proyecto.model.Vacante;
import entornos.iskill_basic.proyecto.repository.VacanteRepository;

@Service
@Transactional
public class VacanteService implements IVacanteService {
    @Autowired
    VacanteRepository VacanteRepository;

    @Override
    public List<Vacante> getAll() {
        return VacanteRepository.findAll();
    }

    @Override
    public Vacante create(Vacante Vacante){
        return VacanteRepository.save(Vacante);
    }

    @Override
    public Vacante update(Vacante Vacante) {
        return VacanteRepository.save(Vacante);
    }

    @Override
    public Optional<Vacante> findById(Long id) {
        return VacanteRepository.findById(id);
    }

    @Override
    public void delete(Long id){
        VacanteRepository.deleteById(id);
        return;
    }
}
