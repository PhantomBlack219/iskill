package entornos.iskill.proyecto.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import entornos.iskill.proyecto.model.EstadoVacante;
import entornos.iskill.proyecto.model.Vacante;
import entornos.iskill.proyecto.repository.VacanteRepository;

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

    @Override
    public Long countVacantesByEstadoAndVacanteId(EstadoVacante estado, Long id){
        return VacanteRepository.countVacantesByEstadoAndVacanteId(estado, id);
    }

    @Override
    public Long countVacantesByVacanteId(Long id){
        return VacanteRepository.countVacantesByVacanteId(id);
    }
}
