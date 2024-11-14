package entornos.iskill.usuario.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import entornos.iskill.usuario.model.TipoUsuario;
import entornos.iskill.usuario.repository.TipoUsuarioRepository;

@Service
@Transactional
public class TipoUsuarioService implements ITipoUsuarioService {
    @Autowired
    TipoUsuarioRepository tipoUsuarioRepository;

    @Override
    public List<TipoUsuario> getAll() {
        return tipoUsuarioRepository.findAll();
    }

    @Override
    public TipoUsuario create(TipoUsuario tipoUsuario){
        return tipoUsuarioRepository.save(tipoUsuario);
    }

    @Override
    public TipoUsuario update(TipoUsuario tipoUsuario) {
        return tipoUsuarioRepository.save(tipoUsuario);
    }

    @Override
    public Optional<TipoUsuario> findById(Long id) {
        return tipoUsuarioRepository.findById(id);
    }

    @Override
    public void delete(Long id){
        tipoUsuarioRepository.deleteById(id);
    }
}
