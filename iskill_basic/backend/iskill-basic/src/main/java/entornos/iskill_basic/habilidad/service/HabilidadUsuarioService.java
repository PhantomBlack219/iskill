package entornos.iskill_basic.habilidad.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import entornos.iskill_basic.habilidad.model.HabilidadUsuario;
import entornos.iskill_basic.habilidad.repository.HabilidadUsuarioRepository;

@Service
@Transactional
public class HabilidadUsuarioService implements IHabilidadUsuarioService {
    
    @Autowired
    HabilidadUsuarioRepository habilidadUsuarioRepository;

    @Override
    public List<HabilidadUsuario> getAll() {
        return habilidadUsuarioRepository.findAll();
    }

    @Override
    public HabilidadUsuario create(HabilidadUsuario habilidadUsuario) {
        return habilidadUsuarioRepository.save(habilidadUsuario);
    }

    @Override
    public HabilidadUsuario update(HabilidadUsuario habilidadUsuario) {
        return habilidadUsuarioRepository.save(habilidadUsuario);
    }

    @Override
    public Optional<HabilidadUsuario> findById(Long id) {
        return habilidadUsuarioRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        habilidadUsuarioRepository.deleteById(id);
    }
}
