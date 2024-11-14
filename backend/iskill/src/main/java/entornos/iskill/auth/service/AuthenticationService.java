package entornos.iskill.auth.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import entornos.iskill.auth.model.LoginDTO;
import entornos.iskill.auth.model.RegistrationDTO;
import entornos.iskill.usuario.model.Usuario;
import entornos.iskill.usuario.repository.UsuarioRepository;

@Service
public class AuthenticationService {
    private final UsuarioRepository usuarioRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public Usuario registration(RegistrationDTO registrationDTO) {
        Usuario usuario = new Usuario();
        usuario.setUsuario_id(registrationDTO.getUsuario_id());
        usuario.setTipo_usuario_id(registrationDTO.getTipo_usuario_id());
        usuario.setNombre(registrationDTO.getNombre());
        usuario.setApellido(registrationDTO.getApellido());
        usuario.setEmail(registrationDTO.getEmail());
        usuario.setUsuario(registrationDTO.getUsuario());
        usuario.setPassword(passwordEncoder.encode(registrationDTO.getPassword()));
        usuario.setFecha_registro(registrationDTO.getFecha_registro());
        usuario.setLogros(registrationDTO.getLogros());
        usuario.setObjetivos_carrera(registrationDTO.getObjetivos_carrera());

        return usuarioRepository.save(usuario);
    }

    public Usuario authenticate(LoginDTO loginDTO) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginDTO.getUsuario(),
                loginDTO.getPassword()
            )
        );

        return usuarioRepository.findByUsuario(loginDTO.getUsuario()).orElseThrow();
    }
}
